const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("EduVerify", function () {
  it("Should issue and verify credentials", async function () {
    const [admin, student] = await ethers.getSigners();
    const EduVerify = await ethers.getContractFactory("EduVerify");
    const eduVerify = await EduVerify.deploy();
    await eduVerify.waitForDeployment(); // ✅ Correct for Hardhat

    await eduVerify.issueCredential(student.address, "Alice", "Blockchain", "University");
    const credential = await eduVerify.verifyCredential(student.address);
    expect(credential[0]).to.equal("Alice");
  });
});

