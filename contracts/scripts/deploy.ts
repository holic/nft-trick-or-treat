import fs from "fs/promises";
import { TrickOrTreat, TrickOrTreat__factory } from "../typechain";
import { ethers, upgrades, network } from "hardhat";
import web3 from "web3";
import uniqBy from "lodash/uniqBy";
import compact from "lodash/compact";

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

  // if (addressBook.trickOrTreat && !process.env.REPLACE_ADDRESS) {
  //   throw new Error(
  //     "This would overwrite the address book. Clear it first if you'd like to deploy new instances."
  //   );
  // }

  const [owner, ...remaining] = await ethers.getSigners();

  const contractFactory = (await ethers.getContractFactory(
    "TrickOrTreat"
  )) as TrickOrTreat__factory;

  let contract: TrickOrTreat;

  if (addressBook.trickOrTreat) {
    if (process.env.UPGRADE_CONTRACT) {
      console.log("Upgrading TrickOrTreat at", addressBook.trickOrTreat);
      contract = (await upgrades.upgradeProxy(
        addressBook.trickOrTreat,
        contractFactory
      )) as TrickOrTreat;
      console.log("Waiting for tx:", contract.deployTransaction.hash);
      await contract.deployed();
    } else {
      contract = TrickOrTreat__factory.connect(addressBook.trickOrTreat, owner);
    }
  } else {
    console.log("Deploying TrickOrTreat…");
    contract = (await upgrades.deployProxy(contractFactory)) as TrickOrTreat;
    console.log("Waiting for tx:", contract.deployTransaction.hash);
    await contract.deployed();
    console.log("TrickOrTreat deployed at", contract.address);
    await fs.writeFile(
      addressesPath,
      JSON.stringify(
        {
          ...addressBook,
          trickOrTreat: contract.address,
        },
        null,
        2
      )
    );
  }

  let nonce = (await owner.getTransactionCount()) + 1;

  const doormen = remaining.map((signer) => signer.address);
  const role = await contract.DOORMAN();
  await Promise.all(
    doormen.map(async (doorman) => {
      // const hasRole = await contract.hasRole(role, doorman);
      // if (!hasRole) {
      const tx = await contract.grantRole(role, doorman, {
        nonce: ++nonce,
      });
      console.log("adding doorman wallet", doorman, tx.hash);
      await tx.wait();
      // }
    })
  );

  console.log("Done!");
}

start().catch((e: Error) => {
  console.error(e);
  process.exit(1);
});
