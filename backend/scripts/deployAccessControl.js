const hre = require("hardhat");

async function main() {
    const AccessControlManager = await hre.ethers.getContractFactory("AccessControlManager");
    const access = await AccessControlManager.deploy();
    await access.waitForDeployment();
    console.log("AccessControlManager deployed to:", access.target);
}

main().catch((error) => {
    console.error("Deployment error:", error);
    process.exitCode = 1;
});
