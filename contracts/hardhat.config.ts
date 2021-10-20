import "@typechain/hardhat";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import "@openzeppelin/hardhat-upgrades";
import { task } from "hardhat/config";
import { ethers } from "ethers";

require("dotenv").config();

task("createWallet", "Creates a new wallet").setAction(async () => {
  console.log("");
  new Array(5).fill(0).map(() => {
    const wallet = ethers.Wallet.createRandom();
    console.log("Wallet:\t", wallet.address);
    console.log("Private key:\t", wallet.privateKey.replace(/^0x/, ""));
    console.log("");
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
      accounts: [process.env.POLYGON_MAINNET_DEPLOYER_PRIVATE_KEY],
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
