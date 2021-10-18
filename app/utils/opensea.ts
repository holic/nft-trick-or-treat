import Web3 from "web3";
import { OpenSeaPort, Network } from "opensea-js";

export const provider = new Web3.providers.HttpProvider(
  "https://mainnet.infura.io"
);

export const opensea = new OpenSeaPort(provider, {
  networkName: Network.Main,
});
