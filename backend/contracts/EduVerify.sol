// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract EduVerify {
    struct Credential {
        string srn;
        string name;
        string course;
        string institution;
        uint256 issueDate;
        bool isValid;
    }

    mapping(address => Credential) public credentials;
    address public admin;

    event CredentialIssued(address indexed student, string srn, string course, string institution);
    event CredentialRevoked(address indexed student);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    constructor(address _admin) {
        admin = _admin;
    }

    function isValidSRN(string memory srn) public pure returns (bool) {
        bytes memory srnBytes = bytes(srn);
        bytes memory prefix = bytes("PES2UG22");

        if (srnBytes.length < prefix.length) {
            return false;
        }

        for (uint i = 0; i < prefix.length; i++) {
            if (srnBytes[i] != prefix[i]) {
                return false;
            }
        }

        return true;
    }

    function issueCredential(
        address student,
        string memory srn,
        string memory name,
        string memory course,
        string memory institution
    ) public onlyAdmin {
        require(isValidSRN(srn), "Invalid SRN. Must start with PES2UG22");

        credentials[student] = Credential(srn, name, course, institution, block.timestamp, true);
        emit CredentialIssued(student, srn, course, institution);
    }

    function revokeCredential(address student) public onlyAdmin {
        credentials[student].isValid = false;
        emit CredentialRevoked(student);
    }

    function getCredential(address student) public view returns (Credential memory) {
        return credentials[student];
    }
}