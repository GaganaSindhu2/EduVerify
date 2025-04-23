const hre = require("hardhat");

async function main() {
    const InstitutionRegistry = await hre.ethers.getContractFactory("InstitutionRegistry");
    const registry = await InstitutionRegistry.deploy();
    await registry.waitForDeployment();
    console.log("InstitutionRegistry deployed to:", registry.target);
}

main().catch((error) => {
    console.error("Deployment error:", error);
    process.exitCode = 1;
});
