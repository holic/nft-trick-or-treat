import type { NextPage } from "next";
import { useAsync } from "react-use";
import Link from "next/link";
import { Layout } from "@app/components/Layout";
import { PendingIcon } from "@app/components/icons/PendingIcon";
import { useUserAddress } from "ethereal-react";
import { Container } from "@app/components/Container";
import { opensea } from "@app/utils/opensea";
import shuffle from "lodash/shuffle";
import Head from "next/head";
import { EligibleNFTs } from "@app/components/EligibleNFTs";

const AboutPage: NextPage = () => (
  <Layout>
    <Container>
      <Head>
        <title>About NFT Trick-or-Treat</title>
      </Head>
      <div className="pt-16 pb-64 flex flex-col gap-8 items-center">
        <p className="text-2xl text-yellow-400">About NFT Trick-or-Treat</p>
        <div className="text-gray-400 text-lg max-w-[40ch] space-y-4">
          <p>
            👋 Happy Halloween! I built this little game to learn about
            blockchain/web3 development and to help bring more attention to some
            of my favorite, lesser known NFTs.
          </p>
          <p>
            To play, just connect to your Ethereum wallet via the button in the
            top-right and you'll be able to pick from one of your spooky NFTs to
            go trick-or-treating with. You'll see a list of places to
            trick-or-treat at (thanks{" "}
            <a
              href="https://opensea.io/collection/lots-tiles"
              target="_blank"
              className="text-yellow-500 hover:text-white border-b border-gray-500"
            >
              Lots!
            </a>
            ). Pick one of those, ring the doorbell, and see if you get tricked
            or get given some treats!
          </p>
          <p>
            You'll soon be able to trade in your treats for spooky prizes. Stay
            tuned!
          </p>
        </div>
        <p className="text-2xl text-yellow-400">Eligible NFTs</p>
        <div className="text-gray-400 text-lg max-w-[40ch] space-y-4">
          <p>Here are the NFTs you can trick-or-treat with:</p>
          <EligibleNFTs />
        </div>
      </div>
    </Container>
  </Layout>
);

export default AboutPage;
