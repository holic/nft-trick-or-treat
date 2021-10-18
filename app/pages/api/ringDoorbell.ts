import type { NextApiRequest, NextApiResponse } from "next";
import * as signedMessageData from "@app/utils/signedMessageData";
import { ethers } from "ethers";
import { isOwner } from "@app/utils/contracts";
import addresses from "contracts/addresses/localhost.json";
import { TrickOrTreat__factory } from "contracts/typechain";

const polygonProvider = new ethers.providers.JsonRpcProvider(
  process.env.NEXT_PUBLIC_POLYGON_RPC_ENDPOINT
);

if (!process.env.DEPLOYER_PRIVATE_KEY) {
  throw new Error("Missing environment variable: DEPLOYER_PRIVATE_KEY");
}

const wallet = new ethers.Wallet(
  process.env.DEPLOYER_PRIVATE_KEY,
  polygonProvider
);

const trickOrTreatContract = TrickOrTreat__factory.connect(
  addresses.trickOrTreat,
  wallet
);

const extractErrorMessage = (error: any) => {
  try {
    const innerError = error.error;
    const rpcResponseBody = innerError.body;
    const rpcResponse = JSON.parse(rpcResponseBody);
    const message = rpcResponse.error.message;
    return message.replace(
      /Error: VM Exception while processing transaction: reverted with reason string '(.*)'$/,
      "$1"
    );
  } catch (e) {
    return null;
  }
};

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

  try {
    const tx = await trickOrTreatContract.ringDoorbell(
      data.visitor,
      data.place
    );
    await tx.wait();
  } catch (error) {
    if (!(error instanceof Error)) {
      throw error;
    }

    for (const [errorCode, message] of Object.entries(errorMessages)) {
      console.log("checking for error code", errorCode);
      if (error.message.includes(`PUMPKIN__${errorCode}`)) {
        return res.status(400).json({
          error: errorCode,
          message,
        });
      }
    }

    console.log("unknown error while creating tx", typeof error);
    throw error;
  }

  res.status(200).json({ success: true });
}
