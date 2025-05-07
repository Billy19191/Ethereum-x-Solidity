// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

contract Inbox {
    string public message;

    constructor(string memory initialMessage)
    {
        message=initialMessage;
    }

    function setMessage(string memory newMessage) public {
        //Modify value
        message = newMessage;
    }
    
    function getMessage() public view returns (string memory){
        //Not modify any data
        return message;
    }
}
