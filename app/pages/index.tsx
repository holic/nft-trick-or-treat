import type { NextPage } from "next";
import { useAsync } from "react-use";
import Link from "next/link";
import { Layout } from "@app/components/Layout";
import { PendingIcon } from "@app/components/icons/PendingIcon";
import { Suspense } from "@app/components/Suspense";
import { useUserAddress } from "ethereal-react";
import { Container } from "@app/components/Container";
import { opensea } from "@app/utils/opensea";
import shuffle from "lodash/shuffle";

const NFTs = () => {
  const owner = useUserAddress();
  const nfts = useAsync(async () => {
    const combinedAssets = await Promise.all([
      opensea.api.getAssets({
        owner,
        asset_contract_address: "0x495f947276749ce646f68ac8c248420045cb7b5e",
        // @ts-ignore
        collection: "weird-kitties",
        limit: 50,
      }),
      opensea.api.getAssets({
        owner,
        // @ts-ignore
        asset_contract_addresses: [
          // Gawds
          "0x3769c5700da07fe5b8eee86be97e061f961ae340",
          // Obits
          "0x30cdac3871c41a63767247c8d1a2de59f5714e78",
          // Nifty League DEGENs
          "0x986aea67c7d6a15036e18678065eb663fc5be883",
          // Spicy Pumpkins
          "0x07a13eea351d501cfedf96bda8528bbc71ca5d80",
        ],
        limit: 50,
      }),
    ]);

    const assets = combinedAssets.flatMap((res) => res.assets);

    return shuffle(assets).slice(0, 12);
  }, [owner]);

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {nfts.loading ? (
        <span className="text-4xl">
          <PendingIcon />
        </span>
      ) : null}
      {nfts.value?.map((nft) => (
        <Link
          key={`${nft.tokenAddress}:${nft.tokenId}`}
          href={`/nft/${encodeURIComponent(
            `${nft.tokenAddress}:${nft.tokenId}`
          )}`}
        >
          <a className="group relative">
            <div className="rounded-full overflow-hidden border-8 border-gray-900 bg-gray-700 group-hover:-translate-y-1 transition">
              <img src={nft.imageUrl} className="w-32 h-32" />
            </div>
            <img
              src="/pumpkin-bucket.png"
              className="w-16 h-16 absolute bottom-1 -right-1 opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 origin-bottom transition"
            />
          </a>
        </Link>
      ))}
    </div>
  );
};

const HomePage: NextPage = () => (
  <Layout>
    <Container>
      <div className="text-center pt-16 pb-64 space-y-8">
        <p className="text-2xl text-yellow-400">
          Happy Halloween! Who are you bringing to trick-or-treat with you?
        </p>
        <Suspense fallback={<PendingIcon />}>
          <NFTs />
        </Suspense>
      </div>
    </Container>
  </Layout>
);

export default HomePage;
