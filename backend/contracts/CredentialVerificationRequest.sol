// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract CredentialVerificationRequest {
    enum Status { Pending, Approved, Rejected }

    struct Request {
        address requester;
        string srn;
        string purpose;
        Status status;
        uint timestamp;
    }

    address public admin;

    mapping(uint => Request) public requests;
    uint public requestCount;

    event RequestCreated(uint id, address requester, string srn);
    event RequestUpdated(uint id, Status status);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can update status");
        _;
    }

    constructor(address _admin) {
        admin = _admin;
    }

    function createRequest(string memory srn, string memory purpose) public {
        requests[requestCount] = Request(msg.sender, srn, purpose, Status.Pending, block.timestamp);
        emit RequestCreated(requestCount, msg.sender, srn);
        requestCount++;
    }

    function updateRequestStatus(uint requestId, Status status) public onlyAdmin {
        require(requestId < requestCount, "Invalid request ID");
        requests[requestId].status = status;
        emit RequestUpdated(requestId, status);
    }

    function getRequest(uint requestId) public view returns (Request memory) {
        require(requestId < requestCount, "Invalid request ID");
        return requests[requestId];
    }
}
