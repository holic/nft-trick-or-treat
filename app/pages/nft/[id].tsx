import { useEffect } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useAsync, useAsyncFn } from "react-use";
import { AsyncState } from "react-use/lib/useAsyncFn";
import { Layout } from "@app/components/Layout";
import { PendingIcon } from "@app/components/icons/PendingIcon";
import { Suspense } from "@app/components/Suspense";
import { Container } from "@app/components/Container";
import { opensea } from "@app/utils/opensea";
import shuffle from "lodash/shuffle";
import { ethers } from "ethers";
import { Place } from "@app/components/Place";
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

const useTreats = () => {
  const visitor = useVisitor();

  const [treats, refreshTreats] = useAsyncFn(async () => {
    if (!visitor) return;
    return trickOrTreatContract.bagContents({
      contractAddress: visitor.tokenAddress,
      tokenId: visitor.tokenId,
    });
  }, [visitor?.tokenAddress, visitor?.tokenId]);

  useEffect(() => {
    refreshTreats();
  }, [refreshTreats]);

  return {
    treats,
    refreshTreats: () => refreshTreats(),
  };
};

const Places = ({ onVisited }: { onVisited: () => void }) => {
  const visitor = useVisitor();

  const assets = useAsync(async () => {
    const { assets } = await opensea.api.getAssets({
      // @ts-ignore
      collection: "lots-tiles",
      limit: 50,
    });
    return shuffle(assets).slice(0, 12);
  }, []);

  if (!visitor || assets.loading) {
    return (
      <span className="text-4xl">
        <PendingIcon />
      </span>
    );
  }

  return (
    <>
      <div className="flex flex-wrap gap-6">
        {assets.value?.map((asset) => (
          <Place
            key={`${asset.tokenAddress}:${asset.tokenId}`}
            visitor={visitor}
            place={{
              ...asset,
              tokenId: asset.tokenId || "",
            }}
            name={asset.description.replace(/^.*Lot \d+ - /, "")}
            onVisited={onVisited}
          />
        ))}
      </div>
    </>
  );
};

const PlayerStatus = ({
  treats,
  refreshTreats,
}: {
  treats: AsyncState<number>;
  refreshTreats: () => void;
}) => {
  const visitor = useVisitor();

  useEffect(() => {
    if (!visitor) return;

    const treatedFilter = trickOrTreatContract.filters.Treated(
      visitor.tokenAddress,
      ethers.BigNumber.from(visitor.tokenId)
    );
    const trickedFilter = trickOrTreatContract.filters.Tricked(
      visitor.tokenAddress,
      ethers.BigNumber.from(visitor.tokenId)
    );

    trickOrTreatContract.on(treatedFilter, refreshTreats);
    trickOrTreatContract.on(trickedFilter, refreshTreats);

    return () => {
      trickOrTreatContract.off(treatedFilter, refreshTreats);
      trickOrTreatContract.off(trickedFilter, refreshTreats);
    };
  }, [visitor?.tokenAddress, visitor?.tokenId, refreshTreats]);

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
      {treats.value != null ? (
        <span className="text-xl">🍬 {treats.value} treats</span>
      ) : null}
    </>
  );
};

const NFTPage: NextPage = () => {
  const { treats, refreshTreats } = useTreats();
  return (
    <Layout>
      <Container>
        <div className="flex pt-16 pb-64 gap-8">
          <div className="flex flex-shrink-0 items-center flex-col flex-wrap">
            <Suspense fallback={<PendingIcon />}>
              <PlayerStatus treats={treats} refreshTreats={refreshTreats} />
            </Suspense>
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-2xl text-yellow-400">
              Whose doorbell should we ring?
            </p>
            <Places onVisited={() => refreshTreats()} />
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default NFTPage;
