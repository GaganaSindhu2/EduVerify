// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AccessControlManager {
    address public owner;

    mapping(address => bool) public adminAccess;
    mapping(address => bool) public institutionAccess;

    event AdminGranted(address indexed admin);
    event InstitutionGranted(address indexed institution);
    event AdminRevoked(address indexed admin);
    event InstitutionRevoked(address indexed institution);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only contract owner can do this");
        _;
    }

    modifier onlyAdmin() {
        require(adminAccess[msg.sender], "Only admin can do this");
        _;
    }

    function grantAdminAccess(address _admin) external onlyOwner {
        adminAccess[_admin] = true;
        emit AdminGranted(_admin);
    }

    function revokeAdminAccess(address _admin) external onlyOwner {
        adminAccess[_admin] = false;
        emit AdminRevoked(_admin);
    }

    function grantInstitutionAccess(address _institution) external onlyAdmin {
        institutionAccess[_institution] = true;
        emit InstitutionGranted(_institution);
    }

    function revokeInstitutionAccess(address _institution) external onlyAdmin {
        institutionAccess[_institution] = false;
        emit InstitutionRevoked(_institution);
    }

    function isAdmin(address _addr) external view returns (bool) {
        return adminAccess[_addr];
    }

    function isInstitution(address _addr) external view returns (bool) {
        return institutionAccess[_addr];
    }
}
