import { ethers, upgrades } from "hardhat";
import { expect } from "chai";
import { TrickOrTreat } from "../typechain";

describe("TrickOrTreat", function () {
  it("should deploy", async function () {
    this.timeout(1000 * 60);

    const [owner, wallet1, wallet2] = await ethers.getSigners();
    const ContractFactory = await ethers.getContractFactory("TrickOrTreat");
    const contract = (await upgrades.deployProxy(
      ContractFactory
    )) as TrickOrTreat;
    await contract.deployed();
    const role = await contract.DOORMAN();

    expect(await contract.hasRole(role, owner.address)).to.equal(false);

    const grantRoleTx = await contract.grantRole(role, owner.address);
    await grantRoleTx.wait();

    expect(await contract.hasRole(role, owner.address)).to.equal(true);

    expect(
      await contract.bagContents({
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

    const treats = await contract.bagContents({
      contractAddress: wallet1.address,
      tokenId: 1,
    });

    expect(treats).to.be.greaterThan(0);
  });
});
