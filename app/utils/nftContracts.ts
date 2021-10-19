import { ethers } from "ethers";

const ERC_721_ABI = Object.freeze([
  "function ownerOf(uint256 id) view returns (address owner)",
]);

const ERC_1155_ABI = Object.freeze([
  "function balanceOf(address owner, uint256 id) view returns (uint256 balance)",
]);

const ethereumProvider = new ethers.providers.JsonRpcProvider(
  process.env.ETHEREUM_RPC_ENDPOINT
);

type NFTContract = {
  contract: ethers.Contract;
  isOwner: (ownerAddress: string, tokenId: string) => Promise<boolean>;
};

export const contracts: Record<string, NFTContract> = {};

const addContract = (
  contractAddress: string,
  abi: typeof ERC_721_ABI | typeof ERC_1155_ABI
) => {
  const contract = new ethers.Contract(contractAddress, abi, ethereumProvider);

  if (abi === ERC_1155_ABI) {
    contracts[contractAddress] = {
      contract,
      isOwner: async (ownerAddress, tokenId) => {
        const balance = await contract.balanceOf(ownerAddress, tokenId);
        switch (balance.toNumber()) {
          case 0:
            return false;
          case 1:
            return true;
          default:
            throw new Error("Unexpected token balance");
        }
      },
    };
  } else if (abi === ERC_721_ABI) {
    contracts[contractAddress] = {
      contract,
      isOwner: async (ownerAddress, tokenId) => {
        const address = await contract.ownerOf(tokenId);
        return address === ownerAddress;
      },
    };
  } else {
    throw new Error("Unexpected ABI type");
  }
};

export const isOwner = async (
  contractAddress: string,
  ownerAddress: string,
  tokenId: string
) => {
  console.log("querying for owner", { contractAddress, ownerAddress, tokenId });
  const contract = contracts[contractAddress];
  if (!contract) {
    throw new Error(`Unsupported contract (${contractAddress})`);
  }
  return await contract.isOwner(ownerAddress, tokenId);
};

// OpenSea NFTs
addContract("0x495f947276749ce646f68ac8c248420045cb7b5e", ERC_1155_ABI);
// Gawds
addContract("0x3769c5700da07fe5b8eee86be97e061f961ae340", ERC_721_ABI);
// Obits
addContract("0x30cdac3871c41a63767247c8d1a2de59f5714e78", ERC_721_ABI);
// Nifty League DEGENs
addContract("0x986aea67c7d6a15036e18678065eb663fc5be883", ERC_721_ABI);
