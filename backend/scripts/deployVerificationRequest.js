const hre = require("hardhat");

async function main() {
  const adminAddress = "0x12EC62AE8980f26D48Be53f06F8ad10AaEA80Fef"; // 👈 Replace this with your actual admin wallet address
  const verificationRequest = await hre.ethers.deployContract("CredentialVerificationRequest", [adminAddress]);
  
  await verificationRequest.waitForDeployment();

  const deployedAddress = await verificationRequest.getAddress();
  console.log("CredentialVerificationRequest deployed to:", deployedAddress);
}

main().catch((error) => {
  console.error("Deployment error:", error);
  process.exitCode = 1;
});
