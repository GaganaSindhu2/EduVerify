// Verify Page (Verify.js)
import React, { useState } from "react";
import { ethers } from "ethers";
import EduVerifyABI from "C:/Users/DELL/Downloads/EduVerify/backend/artifacts/contracts/EduVerify.sol/EduVerify.json";
import CredentialCard from "C:/Users/DELL/Downloads/EduVerify/frontend/src/components/CredentialCard.js";

const contractAddress = "0xYourContractAddress";

function Verify() {
  const [account, setAccount] = useState("");
  const [credential, setCredential] = useState(null);

  const verifyCredential = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, EduVerifyABI, signer);
      setAccount(await signer.getAddress());
      const data = await contract.verifyCredential(account);
      setCredential(data);
    }
  };

  return (
    <div>
      <h1>Verify Credentials</h1>
      <button onClick={verifyCredential}>Verify</button>
      {credential && <CredentialCard credential={credential} />}
    </div>
  );
}

export default Verify;