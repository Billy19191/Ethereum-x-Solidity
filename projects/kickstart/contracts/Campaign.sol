//SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;
contract CampaignFactory {
    address[] public deployedCampaign;

    function createCampaign(uint minimum) public payable {
        address newCampaign = address(new Campaign(minimum, msg.sender));
        deployedCampaign.push(newCampaign);
    }
    function getDeployCampaign() public view returns (address[] memory) {
        return deployedCampaign;
    }
}

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
    uint public approverCount;
    mapping(address => bool) public approvers;
    Request[] public requests;

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
    constructor(uint minimum, address creator) {
        approverCount = 0;
        manager = creator;
        minimumContribution = minimum;
    }

    function contribute() public payable {
        require(msg.value >= minimumContribution);
        approvers[msg.sender] = true;
        approverCount++;
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
        require(request.approvalCount > (request.approvalCount / 2));

        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }

    function finalizeRequest(uint index) public payable restricted {
        Request storage request = requests[index];
        require(!request.complete);
        request.complete = true;
        payable(request.recipient).transfer(request.value);
    }
}
