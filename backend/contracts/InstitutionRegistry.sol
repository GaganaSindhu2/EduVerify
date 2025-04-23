// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract InstitutionRegistry {
    address public owner;

    struct Institution {
        string name;
        string location;
        bool isRegistered;
    }

    mapping(address => Institution) public institutions;

    event InstitutionAdded(address indexed institutionAddress, string name, string location);
    event InstitutionRemoved(address indexed institutionAddress);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can do this");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function registerInstitution(address _institutionAddress, string memory _name, string memory _location) public onlyOwner {
        require(!institutions[_institutionAddress].isRegistered, "Institution already registered");
        institutions[_institutionAddress] = Institution(_name, _location, true);
        emit InstitutionAdded(_institutionAddress, _name, _location);
    }

    function removeInstitution(address _institutionAddress) public onlyOwner {
        require(institutions[_institutionAddress].isRegistered, "Institution not registered");
        delete institutions[_institutionAddress];
        emit InstitutionRemoved(_institutionAddress);
    }

    function isInstitutionRegistered(address _institutionAddress) public view returns (bool) {
        return institutions[_institutionAddress].isRegistered;
    }
}
