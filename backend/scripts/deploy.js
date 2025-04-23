

const hre = require("hardhat");

async function main() {
  const EduVerify = await hre.ethers.getContractFactory("EduVerify");

  // Replace with your MetaMask public address (the deployer/admin)
  const adminAddress = "0x12EC62AE8980f26D48Be53f06F8ad10AaEA80Fef";

  // Deploy the contract
  const eduVerify = await EduVerify.deploy(adminAddress);

  await eduVerify.waitForDeployment(); // ✅ CORRECT method for ethers v6+

  console.log("EduVerify deployed to:", await eduVerify.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
