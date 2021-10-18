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
      isOwner: async (tokenId, ownerAddress) => {
        const address = await contract.ownerOf(tokenId);
        return address === ownerAddress;
      },
    };
  } else {
    throw new Error("Unexpected ABI type");
  }
};

// OpenSea NFT
addContract("0x495f947276749ce646f68ac8c248420045cb7b5e", ERC_1155_ABI);

export const isOwner = async (
  contractAddress: string,
  ownerAddress: string,
  tokenId: string
) => {
  const contract = contracts[contractAddress];
  if (!contract) {
    throw new Error(`Unsupported contract (${contractAddress})`);
  }
  return await contract.isOwner(ownerAddress, tokenId);
};
