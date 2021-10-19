import fs from "fs/promises";
import {
  TrickOrTreat,
  TrickOrTreat__factory,
  TrustedForwarder,
  TrustedForwarder__factory,
} from "../typechain";
import { ethers, upgrades, network } from "hardhat";

// https://docs.biconomy.io/misc/contract-addresses
const trustedForwarders: Record<string, string> = {
  matic: "0x86C80a8aa58e0A4fa09A69624c31Ab2a6CAD56b8",
  mumbai: "0x9399BB24DBB5C4b782C70c2969F58716Ebbd6a3b",
};

const exists = (path: string) =>
  fs
    .access(path)
    .then(() => true)
    .catch(() => false);

async function start() {
  const addressesPath = `${__dirname}/../addresses/${network.name}.json`;
  const addressBook = (await exists(addressesPath))
    ? JSON.parse((await fs.readFile(addressesPath)).toString())
    : {};

  if (addressBook.trickOrTreat && !process.env.REPLACE_ADDRESS) {
    throw new Error(
      "This would overwrite the address book. Clear it first if you'd like to deploy new instances."
    );
  }

  // Deploy trusted forwarder for local dev
  let trustedForwarder = trustedForwarders[network.name];
  if (network.name === "localhost") {
    console.log("Deploying TrustedForwarder...");
    const TrustedForwarderFactory = (await ethers.getContractFactory(
      "TrustedForwarder"
    )) as TrustedForwarder__factory;
    const trustedForwarderContract = (await upgrades.deployProxy(
      TrustedForwarderFactory,
      []
    )) as TrustedForwarder;
    trustedForwarder = trustedForwarderContract.address;
  }

  console.log("Deploying TrickOrTreat...");
  const ContractFactory = (await ethers.getContractFactory(
    "TrickOrTreat"
  )) as TrickOrTreat__factory;
  const contract = (await upgrades.deployProxy(ContractFactory, [
    trustedForwarder,
  ])) as TrickOrTreat;

  console.log("Deploy TX: ", contract.deployTransaction.hash);
  await contract.deployed();
  console.log("TrickOrTreat deployed at ", contract.address);
  addressBook.trickOrTreat = contract.address;
  await fs.writeFile(addressesPath, JSON.stringify(addressBook, null, 2));

  console.log("Deployed!");
}

start().catch((e: Error) => {
  console.error(e);
  process.exit(1);
});
