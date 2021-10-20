import React from "react";
import Head from "next/head";
import { WalletProvider, useConnectToWallet } from "ethereal-react";
import { TopBar } from "@app/components/TopBar";
import { Wallet } from "@app/components/Wallet";
import { WalletConnectButton } from "@app/components/WalletConnectButton";
import { Container } from "@app/components/Container";
import { ToastProvider } from "@app/utils/useToast";
import { Toasts } from "@app/components/Toasts";
import WalletConnectProvider from "@walletconnect/web3-provider";

type Props = {
  children: React.ReactNode;
};

const ConnectWallet = () => {
  const [connect, { loading, error }] = useConnectToWallet();
  return (
    <Container>
      <div className="flex flex-col items-center gap-8 p-20">
        <img src="/pumpkin-bucket.png" className="w-80" />
        <span className="text-6xl font-serif text-yellow-600">
          Happy Halloween!
        </span>
        <button
          type="button"
          className="text-2xl"
          onClick={connect}
          disabled={loading}
        >
          Ready to take your NFTs trick-or-treating? &rarr;
        </button>
      </div>
    </Container>
  );
};

export const Layout = ({ children }: Props) => (
  <>
    <Head>
      <title>NFT Trick or Treat</title>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Festive&amp;display=swap"
        rel="stylesheet"
      ></link>
    </Head>
    <ToastProvider>
      <WalletProvider
        cacheProvider
        network="mainnet"
        providerOptions={{
          walletconnect: {
            package: WalletConnectProvider,
            options: {
              network: "mainnet",
              rpc: {
                1: process.env.NEXT_PUBLIC_ETHEREUM_RPC_ENDPOINT,
              },
            },
          },
        }}
        fallback={
          <>
            <TopBar>
              <WalletConnectButton />
            </TopBar>
            <ConnectWallet />
          </>
        }
      >
        <TopBar>
          <Wallet />
        </TopBar>
        {children}
        <Toasts />
      </WalletProvider>
    </ToastProvider>
  </>
);
