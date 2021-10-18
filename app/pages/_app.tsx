import "tailwindcss/tailwind.css";
import type { AppProps } from "next/app";
import Head from "next/head";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <title>NFT Trick-or-Treat</title>

      <link rel="shortcut icon" href="/pumpkin-bucket.png" type="image/png" />

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
    <Component {...pageProps} />
  </>
);

export default MyApp;
