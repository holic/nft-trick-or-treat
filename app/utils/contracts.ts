import { ethers } from "ethers";
import maticAddresses from "contracts/addresses/matic.json";
import mumbaiAddresses from "contracts/addresses/mumbai.json";
import localAddresses from "contracts/addresses/localhost.json";
import { TrickOrTreat__factory } from "contracts/typechain";

const rpcEndpoint = process.env.NEXT_PUBLIC_POLYGON_RPC_ENDPOINT;
if (!rpcEndpoint) {
  throw new Error("Missing RPC endpoint in environment");
}

let addresses = localAddresses;
if (/polygon-mumbai/.test(rpcEndpoint)) {
  addresses = mumbaiAddresses;
} else if (/polygon-mainnet/.test(rpcEndpoint)) {
  addresses = maticAddresses;
}

export const polygonProvider = new ethers.providers.JsonRpcProvider(
  rpcEndpoint
);

export const trickOrTreatContract = TrickOrTreat__factory.connect(
  addresses.trickOrTreat,
  polygonProvider
);

console.log("Contract:", trickOrTreatContract.address);
