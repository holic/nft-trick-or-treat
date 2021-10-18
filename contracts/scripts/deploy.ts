import fs from "fs/promises";
import { TrickOrTreat, TrickOrTreat__factory } from "../typechain";
import { ethers, upgrades, network } from "hardhat";

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

  if (addressBook.trickOrTreat) {
    throw new Error(
      "This would overwrite the address book. Clear it first if you'd like to deploy new instances."
    );
  }

  if (!addressBook.trickOrTreat) {
    console.log("Deploying TrickOrTreat...");
    const ContractFactory = (await ethers.getContractFactory(
      "TrickOrTreat"
    )) as TrickOrTreat__factory;
    const contract = (await upgrades.deployProxy(
      ContractFactory
    )) as TrickOrTreat;

    console.log("Deploy TX: ", contract.deployTransaction.hash);
    await contract.deployed();
    console.log("TrickOrTreat deployed at ", contract.address);
    addressBook.trickOrTreat = contract.address;
    await fs.writeFile(addressesPath, JSON.stringify(addressBook, null, 2));
  }

  console.log("Deployed!");
}

start().catch((e: Error) => {
  console.error(e);
  process.exit(1);
});
