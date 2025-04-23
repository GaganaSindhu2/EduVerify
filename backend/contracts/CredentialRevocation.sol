// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract CredentialRevocation {
    address public admin;
    mapping(address => bool) public revokedStudents;

    event CredentialRevoked(address indexed student);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    constructor(address _admin) {
        admin = _admin;
    }

    function revokeCredential(address student) public onlyAdmin {
        revokedStudents[student] = true;
        emit CredentialRevoked(student);
    }

    function isRevoked(address student) public view returns (bool) {
        return revokedStudents[student];
    }
}
