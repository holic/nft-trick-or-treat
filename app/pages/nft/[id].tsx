import { useState, useEffect } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useAsync, useAsyncFn } from "react-use";
import { Layout } from "@app/components/Layout";
import { PendingIcon } from "@app/components/PendingIcon";
import { Suspense } from "@app/components/Suspense";
import { Container } from "@app/components/Container";
import { opensea } from "@app/utils/opensea";
import shuffle from "lodash/shuffle";
import { useProvider } from "ethereal-react";
import * as signedMessageData from "@app/utils/signedMessageData";
import { RingDoorbellMessage } from "@app/utils/signedMessageData";
import { ethers } from "ethers";
import { TrickOrTreat__factory } from "contracts/typechain";
import addresses from "contracts/addresses/localhost.json";
import { TypedListener } from "contracts/typechain/common";

const polygonProvider = new ethers.providers.JsonRpcProvider(
  process.env.NEXT_PUBLIC_POLYGON_RPC_ENDPOINT
);

const trickOrTreatContract = TrickOrTreat__factory.connect(
  addresses.trickOrTreat,
  polygonProvider
);

const useVisitor = () => {
  const router = useRouter();
  const id = Array.isArray(router.query.id)
    ? router.query.id[0]
    : router.query.id;

  const [contractAddress, tokenId] = id ? id.split(":") : [];
  return { contractAddress, tokenId };
};

const useRingDoorbell = () => {
  const provider = useProvider();

  const ringDoorbell = async (data: RingDoorbellMessage) => {
    const message = signedMessageData.stringify(
      "Let's go ring the doorbell and shout 'trick-or-treat!'",
      { ts: Date.now(), data }
    );
    const signature = await provider.getSigner().signMessage(message);
    const result = await fetch("/api/ringDoorbell", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message,
        signature,
      }),
    }).then((res) => res.json());

    console.log("got result", result);
  };

  return useAsyncFn(ringDoorbell, [provider]);
};

const Places = () => {
  const visitor = useVisitor();

  const [ringDoorbellState, ringDoorbell] = useRingDoorbell();

  const assets = useAsync(async () => {
    const { assets } = await opensea.api.getAssets({
      // @ts-ignore
      collection: "lots-tiles",
      limit: 50,
    });
    return shuffle(assets).slice(0, 12);
  }, []);

  return (
    <div className="flex flex-wrap gap-4">
      {assets.value?.map((asset) => (
        <div key={`${asset.tokenAddress}:${asset.tokenId}`}>
          <button
            type="button"
            className="rounded-xl overflow-hidden filter saturate-50 hover:saturate-100 transition relative group"
            onClick={() => {
              ringDoorbell({
                visitor,
                place: {
                  contractAddress: asset.tokenAddress,
                  tokenId: asset.tokenId || "",
                },
              });
            }}
          >
            <img src={asset.imageUrl} className="w-40 h-40" />
            <span
              className="absolute inset-0 bg-gray-800 bg-opacity-20 group-hover:opacity-0 transition"
              style={{
                boxShadow: "inset 0 0 4rem 1rem rgba(41, 37, 36, .9)",
              }}
            ></span>
          </button>
          <div className="text-center text-xs text-gray-400">
            {asset.description.replace(/^.*Lot \d+ - /, "")}
          </div>
        </div>
      ))}
    </div>
  );
};

const Player = () => {
  const visitor = useVisitor();
  const [treats, setTreats] = useState(0);

  useEffect(() => {
    trickOrTreatContract.bagContents(visitor).then((amount) => {
      setTreats(amount);
    });

    const treatedFilter = trickOrTreatContract.filters.Treated(
      visitor.contractAddress,
      ethers.BigNumber.from(visitor.tokenId)
    );
    // TODO: figure out how to make a better type signature here
    const treatedListener: TypedListener<
      [string, ethers.BigNumber, number],
      {}
    > = (address, tokenId, amount) => {
      // TODO: just re-query bag instead of updating amount?
      setTreats(Math.max(treats, amount));
    };

    trickOrTreatContract.on(treatedFilter, treatedListener);

    return () => {
      trickOrTreatContract.off(treatedFilter, treatedListener);
    };
  }, [visitor.contractAddress, visitor.tokenId]);

  const { value: nft } = useAsync(async () => {
    return await opensea.api.getAsset({
      tokenAddress: visitor.contractAddress,
      tokenId: visitor.tokenId,
    });
  }, [visitor.contractAddress, visitor.tokenId]);

  return (
    <>
      <a className="group relative">
        <div className="rounded-full overflow-hidden border-8 border-gray-900 bg-gray-900 -translate-y-1">
          <img src={nft?.imageUrl} className="w-32 h-32" />
        </div>
        <img
          src="/pumpkin-bucket.png"
          className="w-16 h-16 absolute bottom-1 -right-1"
        />
      </a>
      <span className="text-lg text-gray-400">🍬 {treats} treats</span>
    </>
  );
};

const NFTPage: NextPage = () => (
  <Layout>
    <Container>
      <div className="flex pt-16 pb-64 gap-8">
        <div className="flex flex-shrink-0 items-center flex-col flex-wrap">
          <Suspense fallback={<PendingIcon />}>
            <Player />
          </Suspense>
        </div>

        <div className="flex flex-col gap-4">
          <p className="text-2xl">Whose doorbell should we ring?</p>
          <Places />
        </div>
      </div>
    </Container>
  </Layout>
);

export default NFTPage;
