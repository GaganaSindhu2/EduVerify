// Credential Card Component (CredentialCard.js)
import React from "react";

function CredentialCard({ credential }) {
  return (
    <div className="credential-card">
      <p>Name: {credential[0]}</p>
      <p>Course: {credential[1]}</p>
      <p>Institution: {credential[2]}</p>
      <p>Issued Date: {new Date(credential[3] * 1000).toLocaleDateString()}</p>
      <p>Status: {credential[4] ? "Valid" : "Revoked"}</p>
    </div>
  );
}

export default CredentialCard;
