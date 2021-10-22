import "@typechain/hardhat";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import "@openzeppelin/hardhat-upgrades";
import "hardhat-gas-reporter";
import { task } from "hardhat/config";

require("dotenv").config();

task("createWallets", "Creates 5 new wallets").setAction(async () => {
  console.log("");
  new Array(5).fill(0).forEach(() => {
    // @ts-ignore
    const wallet = ethers.Wallet.createRandom();
    console.log("Wallet:\t", wallet.address);
    console.log("Private key:\t", wallet.privateKey.replace(/^0x/, ""));
    console.log("");
  });
  console.log("");
});

task("balances", "Show balances of accounts").setAction(async () => {
  // @ts-ignore
  const accounts = await ethers.getSigners();
  console.log("");
  const results = await Promise.all(
    // @ts-ignore
    accounts.map(async (account) => {
      // @ts-ignore
      const balance = await ethers.provider.getBalance(account.address);
      return [account, balance];
    })
  );
  // @ts-ignore
  results.forEach(([account, balance]) => {
    console.log(
      account.address,
      "has balance",
      // @ts-ignore
      ethers.utils.formatEther(balance, 18)
    );
  });
  console.log("");
});

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
export default {
  solidity: "0.8.4",
  networks: {
    hardhat: {
      chainId: 1337,
      mining: {
        auto: false,
        interval: 1000,
      },
    },
    matic: {
      url: process.env.POLYGON_MAINNET_URL,
      accounts: [
        process.env.POLYGON_MAINNET_DEPLOYER_PRIVATE_KEY,
        ...(process.env.POLYGON_MAINNET_DOORMAN_PRIVATE_KEYS?.split(",") || []),
      ],
    },
    mumbai: {
      url: process.env.POLYGON_MUMBAI_URL,
      accounts: [
        process.env.POLYGON_MUMBAI_DEPLOYER_PRIVATE_KEY,
        ...(process.env.POLYGON_MUMBAI_DOORMAN_PRIVATE_KEYS?.split(",") || []),
      ],
    },
  },
};
