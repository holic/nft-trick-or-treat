import type { NextPage } from "next";
import { useAsync } from "react-use";
import { Layout } from "@app/components/Layout";
import { Container } from "@app/components/Container";
import { opensea } from "@app/utils/opensea";
import { trickOrTreatContract } from "@app/utils/contracts";
import orderBy from "lodash/orderBy";
import Head from "next/head";

const getAsset = async (tokenAddress: string, tokenId: string) => {
  return await opensea.api.getAsset({
    tokenAddress,
    tokenId,
  });
};

const LeaderboardPage: NextPage = () => {
  const visitors = useAsync(async () => {
    const visitorHashes = await trickOrTreatContract.listVisitors();

    const scores = await Promise.all(
      visitorHashes.map((visitorHash) =>
        Promise.all([
          trickOrTreatContract
            .visitorHashes(visitorHash)
            .then(({ contractAddress, tokenId }) =>
              getAsset(contractAddress, tokenId.toString())
            ),
          trickOrTreatContract.treats(visitorHash),
        ])
      )
    );

    return orderBy(scores, ([visitor, treats]) => -treats);
  }, []);

  if (visitors.loading) {
    return <Layout loading />;
  }

  return (
    <Layout>
      <Container>
        <Head>
          <title>Leaderboard 🍬 NFT Trick-or-Treat</title>
        </Head>
        <div className="pt-12 pb-32 flex flex-col gap-8">
          <p className="text-2xl text-yellow-400">
            Who has gathered the most treats?
          </p>
          <div className="flex flex-col gap-2">
            {visitors.value?.slice(0, 20).map(([visitor, treats]) => (
              <div
                key={visitor.openseaLink}
                className="flex gap-2 items-center text-lg"
              >
                <a
                  href={visitor.openseaLink}
                  target="_blank"
                  className="w-12 h-12 rounded-full flex items-center justify-center overflow-hidden"
                >
                  <img src={visitor.imageUrl} />
                </a>
                <a
                  href={visitor.openseaLink}
                  target="_blank"
                  className="text-yellow-500 hover:text-white border-b border-gray-500"
                >
                  {visitor.name}
                </a>{" "}
                has <span className="text-white">🍬 {treats} treats</span> in
                their bag
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default LeaderboardPage;
