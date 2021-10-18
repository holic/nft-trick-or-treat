import "@typechain/hardhat";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import "@openzeppelin/hardhat-upgrades";

require("dotenv").config();

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
      accounts: [process.env.POLYGON_MUMBAI_DEPLOYER_PRIVATE_KEY],
    },
  },
};
