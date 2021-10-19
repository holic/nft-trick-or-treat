import { useState, useEffect } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useAsync } from "react-use";
import { Layout } from "@app/components/Layout";
import { PendingIcon } from "@app/components/icons/PendingIcon";
import { Suspense } from "@app/components/Suspense";
import { Container } from "@app/components/Container";
import { opensea } from "@app/utils/opensea";
import shuffle from "lodash/shuffle";
import { ethers } from "ethers";
import { TypedListener } from "contracts/typechain/common";
import { Place } from "@app/components/Place";
import { useToast } from "@app/utils/useToast";
import { trickOrTreatContract } from "@app/utils/contracts";

const useVisitor = () => {
  const router = useRouter();
  const id = Array.isArray(router.query.id)
    ? router.query.id[0]
    : router.query.id;

  const [contractAddress, tokenId] = id ? id.split(":") : [];
  return { contractAddress, tokenId };
};

const Places = () => {
  const visitor = useVisitor();
  const { addToast } = useToast();

  const assets = useAsync(async () => {
    const { assets } = await opensea.api.getAssets({
      // @ts-ignore
      collection: "lots-tiles",
      limit: 50,
    });
    return shuffle(assets).slice(0, 12);
  }, []);

  useEffect(() => {
    const treatedFilter = trickOrTreatContract.filters.Treated(
      visitor.contractAddress,
      ethers.BigNumber.from(visitor.tokenId)
    );
    // TODO: figure out how to make a better type signature here
    const treatedListener: TypedListener<
      [string, ethers.BigNumber, number],
      {}
    > = (address, tokenId, amount) => {
      addToast(`🍬 Yay, they gave us ${amount} treats. Thanks!`);
    };

    const trickedFilter = trickOrTreatContract.filters.Tricked(
      visitor.contractAddress,
      ethers.BigNumber.from(visitor.tokenId)
    );
    // TODO: figure out how to make a better type signature here
    const trickedListener: TypedListener<
      [string, ethers.BigNumber, number],
      {}
    > = (address, tokenId, amount) => {
      addToast(
        `👺 Oh no, they tricked us! They took ${amount} of my treats. Let's get out of here!`
      );
    };

    trickOrTreatContract.on(treatedFilter, treatedListener);
    trickOrTreatContract.on(trickedFilter, trickedListener);

    return () => {
      trickOrTreatContract.off(treatedFilter, treatedListener);
      trickOrTreatContract.off(trickedFilter, trickedListener);
    };
  }, [visitor.contractAddress, visitor.tokenId]);

  return (
    <div className="flex flex-wrap gap-6">
      {assets.loading ? (
        <span className="text-4xl">
          <PendingIcon />
        </span>
      ) : null}
      {assets.value?.map((asset) => (
        <Place
          key={`${asset.tokenAddress}:${asset.tokenId}`}
          visitor={visitor}
          place={{
            contractAddress: asset.tokenAddress,
            tokenId: asset.tokenId || "",
          }}
          name={asset.description.replace(/^.*Lot \d+ - /, "")}
          imageUrl={asset.imageUrl}
        />
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
      <span className="text-lg">🍬 {treats} treats</span>
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
          <p className="text-2xl text-yellow-400">
            Whose doorbell should we ring?
          </p>
          <Places />
        </div>
      </div>
    </Container>
  </Layout>
);

export default NFTPage;
