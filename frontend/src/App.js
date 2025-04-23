import React, { useState } from "react";
import { ethers } from "ethers";
import EduVerify from "./EduVerify.json";
import CredentialRevocation from "./CredentialRevocation.json";
import AccessControlManager from "./AccessControlManager.json"; // Import ABI for AccessControlManager
import InstitutionRegistry from "./InstitutionRegistry.json"; // Import ABI for InstitutionRegistry
import './App.css';

const eduVerifyContractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
const revocationContractAddress = process.env.REACT_APP_REVOCATION_CONTRACT_ADDRESS;
const accessControlManagerAddress = process.env.REACT_APP_ACCESS_CONTROL_CONTRACT; // New contract address for AccessControlManager
const institutionRegistryAddress = process.env.REACT_APP_INSTITUTION_REGISTRY_CONTRACT; // New contract address for InstitutionRegistry

function App() {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [revocationContract, setRevocationContract] = useState(null);
  const [accessControlManager, setAccessControlManager] = useState(null); // State for AccessControlManager contract
  const [institutionRegistry, setInstitutionRegistry] = useState(null); // State for InstitutionRegistry contract
  const [form, setForm] = useState({
    student: "",
    srn: "",
    name: "",
    course: "",
    institution: ""
  });

  const [viewAddress, setViewAddress] = useState("");
  const [credentialInfo, setCredentialInfo] = useState(null);
  const [adminAddress, setAdminAddress] = useState(""); // Address for granting/revoking admin role
  const [institutionAddress, setInstitutionAddress] = useState(""); // Address for institution management

  const connectWallet = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      try {
        // Request accounts
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const userAddress = await signer.getAddress();
        setAccount(userAddress);
  
        // Set the contracts
        const eduVerify = new ethers.Contract(eduVerifyContractAddress, EduVerify.abi, signer);
        setContract(eduVerify);
  
        const revocation = new ethers.Contract(revocationContractAddress, CredentialRevocation.abi, signer);
        setRevocationContract(revocation);
  
        const accessControl = new ethers.Contract(accessControlManagerAddress, AccessControlManager.abi, signer);
        setAccessControlManager(accessControl);
  
        const institution = new ethers.Contract(institutionRegistryAddress, InstitutionRegistry.abi, signer);
        setInstitutionRegistry(institution);
  
        console.log("Wallet connected:", userAddress);
      } catch (err) {
        console.error("User denied wallet connection or error:", err);
        alert("MetaMask wallet connection failed.");
      }
    } else {
      alert("Please install MetaMask");
    }
  };
  

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const issueCredential = async () => {
    if (!contract) return alert("Connect wallet first!");
  
    try {
      // Make sure the parameters are correctly passed
      const tx = await contract.issueCredential(
        form.student,
        form.srn,
        form.name,
        form.course,
        form.institution
      );
      
      // Wait for the transaction to be mined
      await tx.wait();
  
      // Notify success
      alert("Credential issued successfully!");
    } catch (error) {
      if (error.message.includes("Invalid SRN")) {
        alert("SRN must start with 'PES2UG22'");
      } else {
        console.error("Error issuing credential:", error);
        alert("Error issuing credential. Check console for details.");
      }
    }
  };
  

  const revokeCredential = async () => {
    if (!contract) return alert("Connect wallet first!");

    try {
      const tx = await contract.revokeCredential(form.student);
      await tx.wait();
      alert("Credential revoked!");
    } catch (error) {
      console.error("Error revoking credential:", error);
    }
  };

  const revokeUsingNewContract = async () => {
    if (!revocationContract) return alert("Connect wallet first!");

    try {
      const tx = await revocationContract.revokeCredential(form.student);
      await tx.wait();
      alert("Credential revoked via new contract!");
    } catch (error) {
      console.error("Error revoking credential with new contract:", error);
    }
  };

  const viewCredential = async () => {
    if (!contract) return alert("Connect wallet first!");
  
    try {
      const cred = await contract.getCredential(viewAddress); // Fetch data
      console.log(cred); // Log the data to check the format

      // Ensure that the data is stored correctly in state
      setCredentialInfo({
        srn: cred.srn,
        name: cred.name,
        course: cred.course,
        institution: cred.institution,
        issueDate: new Date(cred.issueDate * 1000).toLocaleString(), // Convert timestamp to a human-readable date
        isValid: cred.isValid ? "Yes" : "No"
      });
    } catch (error) {
      console.error("Error viewing credential:", error);
      alert("Error viewing credential. Check console for details.");
    }
  };

  const grantAdminRole = async () => {
    if (!accessControlManager) return alert("Connect wallet first!");

    try {
      const tx = await accessControlManager.grantAdminAccess(adminAddress);
      await tx.wait();
      alert("Admin role granted!");
    } catch (error) {
      console.error("Error granting admin role:", error);
    }
  };

  const revokeAdminRole = async () => {
    if (!accessControlManager) return alert("Connect wallet first!");

    try {
      const tx = await accessControlManager.revokeAdminAccess(adminAddress);
      await tx.wait();
      alert("Admin role revoked!");
    } catch (error) {
      console.error("Error revoking admin role:", error);
    }
  };

  const addInstitution = async () => {
    if (!institutionRegistry) return alert("Connect wallet first!");

    try {
      const tx = await institutionRegistry.registerInstitution(
        institutionAddress,
        form.name,
        form.institution
      );
      await tx.wait();
      alert("Institution added successfully!");
    } catch (error) {
      console.error("Error adding institution:", error);
      alert("Error adding institution. Check console for details.");
    }
  };

  const removeInstitution = async () => {
    if (!institutionRegistry) return alert("Connect wallet first!");

    try {
      const tx = await institutionRegistry.removeInstitution(institutionAddress);
      await tx.wait();
      alert("Institution removed successfully!");
    } catch (error) {
      console.error("Error removing institution:", error);
      alert("Error removing institution. Check console for details.");
    }
  };

  return (
    <div className="container">
      <h2>EduVerify - Credential Management</h2>
      <button onClick={connectWallet}>Connect Wallet</button>

      <h3>Issue Credential</h3>
      <input name="student" placeholder="Student Address" onChange={handleChange} /><br />
      <input name="srn" placeholder="SRN" onChange={handleChange} /><br />
      <input name="name" placeholder="Student Name" onChange={handleChange} /><br />
      <input name="course" placeholder="Course" onChange={handleChange} /><br />
      <input name="institution" placeholder="Institution" onChange={handleChange} /><br />
      <button onClick={issueCredential}>Issue</button>

      <h3>Revoke Credential via New Contract</h3>
      <button onClick={revokeCredential}>Revoke</button>


      <h3>View Credential</h3>
      <input
        placeholder="Student Address"
        value={viewAddress}
        onChange={(e) => setViewAddress(e.target.value)}
      />
      <button onClick={viewCredential}>View</button>
      
      {credentialInfo && (
        <div style={{ marginTop: "20px" }}>
          <h4>Credential Info:</h4>
          <p><strong>Name:</strong> {credentialInfo.name}</p>
          <p><strong>SRN:</strong> {credentialInfo.srn}</p>
          <p><strong>Course:</strong> {credentialInfo.course}</p>
          <p><strong>Institution:</strong> {credentialInfo.institution}</p>
          <p><strong>Issued:</strong> {credentialInfo.issueDate}</p>
          <p><strong>Valid:</strong> {credentialInfo.isValid}</p>
        </div>
      )}

      <h3>Grant/Revoke Admin Role</h3>
      <input
        name="adminAddress"
        placeholder="Admin Address"
        onChange={(e) => setAdminAddress(e.target.value)}
      /><br />
      <button onClick={grantAdminRole}>Grant Admin</button>
      <button onClick={revokeAdminRole}>Revoke Admin</button>

      <h3>Institution Management</h3>
      <input
        name="institutionAddress"
        placeholder="Institution Address"
        onChange={(e) => setInstitutionAddress(e.target.value)}
      /><br />
      <button onClick={addInstitution}>Add Institution</button>
      <button onClick={removeInstitution}>Remove Institution</button>
    </div>
  );
}

export default App;
