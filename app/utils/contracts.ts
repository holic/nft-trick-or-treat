import { ethers } from "ethers";
import addresses from "contracts/addresses/mumbai.json";
import { TrickOrTreat__factory } from "contracts/typechain";

export const polygonProvider = new ethers.providers.JsonRpcProvider(
  process.env.NEXT_PUBLIC_POLYGON_RPC_ENDPOINT
);

export const trickOrTreatContract = TrickOrTreat__factory.connect(
  addresses.trickOrTreat,
  polygonProvider
);

console.log("Contract:", trickOrTreatContract.address);
