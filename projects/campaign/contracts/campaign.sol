//SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Campaign {
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }

    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    Request[] public requests;

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
    constructor(uint minimum) {
        manager = msg.sender;
        minimumContribution = minimum;
    }

    function contribute() public payable {
        require(msg.value >= minimumContribution);
        approvers[msg.sender] = true;
    }

    function createRequest(
        string memory description,
        uint value,
        address recipient
    ) public payable restricted {
        require(approvers[msg.sender]);

        Request storage newRequest = requests.push();
        newRequest.description = description;
        newRequest.recipient = recipient;
        newRequest.value = value;
        newRequest.complete = false;
        newRequest.approvalCount = 0;
    }

    function approveRequest(uint index) public payable {
        Request storage request = requests[index];
        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]); //Haven't vote yet

        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }
}
