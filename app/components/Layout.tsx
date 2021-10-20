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
        <Container>
          <div className="bg-gray-900 bg-opacity-50 px-4 py-3 rounded mb-4 flex items-center justify-between">
            <span className="text-lg">
              {" "}
              Built by{" "}
              <a
                href="https://twitter.com/kingersoll"
                target="_blank"
                className="text-yellow-500 hover:text-white border-b border-gray-500"
              >
                holic.eth
              </a>{" "}
              👻
            </span>
            <span className="text-sm">
              Having fun? Send some MATIC to{" "}
              <samp className="bg-black px-1.5 py-1 rounded">holic.eth</samp> to
              help me pay for gas.
            </span>
            {/* 
            <span>
              Keep the fun going by funding these wallets:{" "}
              <a
                href="https://polygonscan.com/address/0x1a25497Ac7d9EA374080ABa45e0D0e7e2eF74C45"
                target="_blank"
                className="text-yellow-500 hover:text-white border-b border-gray-500"
              >
                1
              </a>{" "}
              <a
                href="https://polygonscan.com/address/0xdF088DAc6934211e92e0c2a18284e87F4e22dD1c"
                target="_blank"
                className="text-yellow-500 hover:text-white border-b border-gray-500"
              >
                2
              </a>{" "}
              <a
                href="https://polygonscan.com/address/0x391A30dF64413625c227a8f1811698ac1EC5aF47"
                target="_blank"
                className="text-yellow-500 hover:text-white border-b border-gray-500"
              >
                3
              </a>{" "}
              <a
                href="https://polygonscan.com/address/0xB99321053F0E8C32d7AbD72dB819cC2C739e3B06"
                target="_blank"
                className="text-yellow-500 hover:text-white border-b border-gray-500"
              >
                4
              </a>{" "}
              <a
                href="https://polygonscan.com/address/0x5cB83488655044d8d14D8dc294Cb4977C24a03DF"
                target="_blank"
                className="text-yellow-500 hover:text-white border-b border-gray-500"
              >
                5
              </a>
            </span>
            */}
          </div>
        </Container>
        <Toasts />
      </WalletProvider>
    </ToastProvider>
  </>
);
