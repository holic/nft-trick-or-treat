import fs from "fs/promises";
import { TrickOrTreat, TrickOrTreat__factory } from "../typechain";
import { ethers, upgrades, network } from "hardhat";
import web3 from "web3";
import uniqBy from "lodash/uniqBy";

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

  const contractFactory = (await ethers.getContractFactory(
    "TrickOrTreat"
  )) as TrickOrTreat__factory;

  let contract: TrickOrTreat;

  if (addressBook.trickOrTreat) {
    console.log("Upgrading TrickOrTreat at", addressBook.trickOrTreat);
    contract = (await upgrades.upgradeProxy(
      addressBook.trickOrTreat,
      contractFactory
    )) as TrickOrTreat;
    console.log("Waiting for tx:", contract.deployTransaction.hash);
    await contract.deployed();
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

  const [owner, ...remaining] = await ethers.getSigners();
  let nonce = await owner.getTransactionCount();

  const doormen = remaining.map((signer) => signer.address);
  const role = await contract.DOORMAN();
  console.log("adding doormen wallets", doormen);
  await Promise.all(
    doormen.map(async (doorman) => {
      const tx = await contract.grantRole(role, doorman, {
        nonce: ++nonce,
      });
      await tx.wait();
    })
  );

  console.log("backfilling visitors");
  console.log("currently at ", (await contract.listVisitors()).length);

  const treatedFilter = contract.filters.Treated();
  const treatedEvents = await contract.queryFilter(treatedFilter, 20422645);
  const visitors = uniqBy(
    treatedEvents.map((event) => ({
      contractAddress: event.args.visitorContractAddress,
      tokenId: event.args.visitorTokenId,
    })),
    ({ contractAddress, tokenId }) => `${contractAddress}:${tokenId}`
  );

  await Promise.all(
    visitors.map(async (visitor) => {
      const hasVisited = await contract.hasVisitedBefore(visitor);
      console.log("has visited?", hasVisited, visitor);
      if (!hasVisited) {
        console.log("adding visitor", visitor);
        const addTx = await contract.addVisitor(visitor, { nonce: ++nonce });
        await addTx.wait();
        console.log(
          "now has visited?",
          await contract.hasVisitedBefore(visitor),
          visitor
        );
      }
    })
  );
  console.log("now at ", (await contract.listVisitors()).length);

  console.log("Done!");
}

start().catch((e: Error) => {
  console.error(e);
  process.exit(1);
});
