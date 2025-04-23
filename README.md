commands to execute:

A. backend directory:
    1. npx hardhat compile
    2. npx hardhat run scripts/deploy.js --network sepolia
    3. npx hardhat run scripts/deployRevocation.js --network sepolia
    4. npx hardhat run scripts/deployStudentProfile.js --network sepolia
    5. npx hardhat run scripts/deployVerificationRequest.js --network sepolia
    6. npx hardhat run scripts/deployInstitutionRegistry.js --network sepolia
    7. npx hardhat run scripts/deployAccessControl.js --network sepolia
Add all the deployed contract address to .env file

B. frontend
    1. npm start
