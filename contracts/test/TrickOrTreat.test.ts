import { ethers, upgrades } from "hardhat";
import { expect } from "chai";

describe("TrickOrTreat", function () {
  it("should deploy", async function () {
    const [owner, wallet1, wallet2] = await ethers.getSigners();
    const ContractFactory = await ethers.getContractFactory("TrickOrTreat");
    const contract = await upgrades.deployProxy(ContractFactory);
    await contract.deployed();

    expect(await contract.owner()).to.equal(owner.address);

    expect(
      await contract.tricksBalance({
        contractAddress: wallet1.address,
        tokenId: 1,
      })
    ).to.equal(0);

    expect(
      await contract.treatsBalance({
        contractAddress: wallet1.address,
        tokenId: 1,
      })
    ).to.equal(0);

    const tx = await contract
      .connect(owner)
      .ringDoorbell(
        { contractAddress: wallet1.address, tokenId: 1 },
        { contractAddress: wallet2.address, tokenId: 1 }
      );
    await tx.wait();

    const tricks = await contract.tricksBalance({
      contractAddress: wallet1.address,
      tokenId: 1,
    });
    const treats = await contract.treatsBalance({
      contractAddress: wallet1.address,
      tokenId: 1,
    });

    expect(tricks.toNumber() + treats.toNumber()).to.be.greaterThan(0);
  });
});
