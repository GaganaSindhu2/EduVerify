async function main() {
    const hre = require("hardhat");
    const [deployer] = await hre.ethers.getSigners();
  
    console.log("Deploying contracts with the account:", deployer.address);
  
    const CredentialRevocation = await hre.ethers.getContractFactory("CredentialRevocation");
    const revocationContract = await CredentialRevocation.deploy(deployer.address);
  
    await revocationContract.waitForDeployment(); // for newer versions of ethers
  
    console.log("CredentialRevocation deployed to:", await revocationContract.getAddress());
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error("Deployment error:", error);
      process.exit(1);
    });
  