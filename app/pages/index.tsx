import type { NextPage } from "next";
import { useAsync } from "react-use";
import Link from "next/link";
import { Layout } from "@app/components/Layout";
import { PendingIcon } from "@app/components/PendingIcon";
import { Suspense } from "@app/components/Suspense";
import { useUserAddress } from "ethereal-react";
import { Container } from "@app/components/Container";
import { opensea } from "@app/utils/opensea";
import shuffle from "lodash/shuffle";

const NFTs = () => {
  const owner = useUserAddress();
  const nfts = useAsync(async () => {
    // TODO: submit PR to allow `getAssets` to accept `asset_contract_addresses`
    const { assets } = await opensea.api.getAssets({
      owner,
      asset_contract_address: "0x495f947276749ce646f68ac8c248420045cb7b5e",
      limit: 50,
    });
    return shuffle(assets).slice(0, 12);
  }, [owner]);

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {nfts.value?.map((nft) => (
        <Link
          key={`${nft.tokenAddress}:${nft.tokenId}`}
          href={`/nft/${encodeURIComponent(
            `${nft.tokenAddress}:${nft.tokenId}`
          )}`}
        >
          <a className="group relative">
            <div className="rounded-full overflow-hidden border-8 border-gray-900 bg-gray-900 group-hover:-translate-y-1 transition">
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
        <p className="text-2xl">
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
