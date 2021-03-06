import type { NextApiRequest, NextApiResponse } from "next";
import * as signedMessageData from "@app/utils/signedMessageData";
import { ethers } from "ethers";
import { trickOrTreatContract } from "@app/utils/contracts";
import { NonceManager } from "@ethersproject/experimental";
import { createHash } from "crypto";
import { parseTransactionError } from "@app/utils/parseTransactionError";
import { isOwner } from "@app/utils/nftContracts";

if (!process.env.DOORMAN_PRIVATE_KEYS) {
  throw new Error("Missing environment variable: DOORMAN_PRIVATE_KEYS");
}

const hash = (input: string) => createHash("sha256").update(input).digest();

const wallets = process.env.DOORMAN_PRIVATE_KEYS.split(",").map(
  (privateKey) =>
    new NonceManager(
      new ethers.Wallet(privateKey.trim(), trickOrTreatContract.provider)
    )
);

const errorMessages = {
  BAG_FULL:
    "My bag is too heavy. Don't you think we have enough treats? Let's go eat some and share with our friends. Happy Halloween!",
  TOO_TIRED:
    "Oww, my feet hurt. I think that's enough trick-or-treating for today. Let's go again tomorrow?",
  ALREADY_VISITED_TODAY:
    "I think we've been here already today. Let's try another place?",
  NO_ANSWER:
    "Aww, no one answered the door and the lights are out. Maybe no one is home. Let's try another place?",
};

// TODO(contract): rate limit how often an NFT or wallet can trick or treat?

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // TODO: figure out if we need a more robust/secure mechanism to ensure the signed message
  //         1) came from the wallet owner
  //         2) was signed recently (not old)
  //         3) is unique and not reused
  //
  // Or maybe we don't need to be that thorough and can have the signer just sign/submit once and save an "authenticated session"?

  const { message, signature } = req.body;
  const { address, data } = signedMessageData.parse(message, signature);

  // TODO: we can probably just do this once per NFT and cache the result for the ~day
  if (
    !(await isOwner(
      data.visitor.contractAddress,
      address,
      data.visitor.tokenId
    ))
  ) {
    // TODO: make a generic error handler so we can throw or wrap our errors
    res.status(400).json({
      error: "NOT_OWNER",
      message: "You do not own this NFT. Try one of your own?",
    });
  }

  // Pick a wallet based on the hash of visitor/place, so retries flow through the same nonce manager
  const visitorPlaceHash = hash(JSON.stringify([data.visitor, data.place]));
  const wallet = wallets[visitorPlaceHash.readUInt32LE() % wallets.length];

  try {
    // TODO: can probably move this to the frontend, before signing
    await trickOrTreatContract.canRingDoorbell(data.visitor, data.place);

    const tx = await trickOrTreatContract
      .connect(wallet)
      .ringDoorbell(data.visitor, data.place, { gasLimit: 250_000 });

    res.status(200).json({ transaction: tx.hash });
  } catch (error) {
    if (!(error instanceof Error)) {
      throw error;
    }

    const response = parseTransactionError(error);
    if (response) {
      return res.status(400).json(response);
    }

    console.log("unknown error while creating tx", typeof error);
    throw error;
  }
}
