// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract StudentProfile {
    struct Profile {
        string name;
        string email;
        string course;
        string institution;
        string bio;
        bool exists;
    }

    mapping(address => Profile) private profiles;

    event ProfileCreated(address indexed student, string name);
    event ProfileUpdated(address indexed student, string name);

    function createProfile(
        string memory name,
        string memory email,
        string memory course,
        string memory institution,
        string memory bio
    ) public {
        require(!profiles[msg.sender].exists, "Profile already exists");
        profiles[msg.sender] = Profile(name, email, course, institution, bio, true);
        emit ProfileCreated(msg.sender, name);
    }

    function updateProfile(
        string memory name,
        string memory email,
        string memory course,
        string memory institution,
        string memory bio
    ) public {
        require(profiles[msg.sender].exists, "Profile not found");
        profiles[msg.sender] = Profile(name, email, course, institution, bio, true);
        emit ProfileUpdated(msg.sender, name);
    }

    function getProfile(address student) public view returns (Profile memory) {
        require(profiles[student].exists, "Profile does not exist");
        return profiles[student];
    }
}
