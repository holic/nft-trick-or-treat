import { useState, useEffect } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useAsync, useAsyncFn } from "react-use";
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
import { Player } from "@app/components/Player";

const useVisitor = () => {
  const router = useRouter();
  const id = Array.isArray(router.query.id)
    ? router.query.id[0]
    : router.query.id;

  const [tokenAddress, tokenId] = id ? id.split(":") : [];

  const asset = useAsync(async () => {
    return await opensea.api.getAsset({
      tokenAddress,
      tokenId,
    });
  }, []);

  return asset.value
    ? {
        tokenAddress: asset.value.tokenAddress,
        tokenId: asset.value.tokenId || "",
        imageUrl: asset.value.imageUrl,
      }
    : null;
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
    if (!visitor) return;

    const treatedFilter = trickOrTreatContract.filters.Treated(
      visitor.tokenAddress,
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
      visitor.tokenAddress,
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
  }, [visitor?.tokenAddress, visitor?.tokenId]);

  if (!visitor) return null;

  return (
    <>
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
              ...asset,
              tokenId: asset.tokenId || "",
            }}
            name={asset.description.replace(/^.*Lot \d+ - /, "")}
          />
        ))}
      </div>
    </>
  );
};

const PlayerStatus = () => {
  const visitor = useVisitor();

  const [bagContents, fetchBagContents] = useAsyncFn(async () => {
    if (!visitor) return;
    return trickOrTreatContract.bagContents({
      contractAddress: visitor.tokenAddress,
      tokenId: visitor.tokenId,
    });
  }, [visitor?.tokenAddress, visitor?.tokenId]);

  const treats = bagContents?.value || 0;

  useEffect(() => {
    if (!visitor) return;

    fetchBagContents();

    const treatedFilter = trickOrTreatContract.filters.Treated(
      visitor.tokenAddress,
      ethers.BigNumber.from(visitor.tokenId)
    );
    const trickedFilter = trickOrTreatContract.filters.Tricked(
      visitor.tokenAddress,
      ethers.BigNumber.from(visitor.tokenId)
    );

    trickOrTreatContract.on(treatedFilter, fetchBagContents);
    trickOrTreatContract.on(trickedFilter, fetchBagContents);

    return () => {
      trickOrTreatContract.off(treatedFilter, fetchBagContents);
      trickOrTreatContract.off(trickedFilter, fetchBagContents);
    };
  }, [visitor?.tokenAddress, visitor?.tokenId]);

  const { value: nft } = useAsync(async () => {
    if (!visitor) return;

    return await opensea.api.getAsset({
      tokenAddress: visitor.tokenAddress,
      tokenId: visitor.tokenId,
    });
  }, [visitor?.tokenAddress, visitor?.tokenId]);

  return (
    <>
      <Player imageUrl={nft?.imageUrl} />
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
            <PlayerStatus />
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
