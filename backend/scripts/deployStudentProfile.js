const hre = require("hardhat");

async function main() {
  const studentProfile = await hre.ethers.deployContract("StudentProfile");
  await studentProfile.waitForDeployment();
  console.log("StudentProfile deployed to:", await studentProfile.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
