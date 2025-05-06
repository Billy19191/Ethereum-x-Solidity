pragma solidity ^0.8.26;

contract TestInbox {
    string public message;

    function Inbox(string memory initialMessage) public {
        message = initialMessage;
    }

    function setMessage(string memory newMessage) public {
        message = newMessage;
    }
    
    function viewMessage() public view returns (string memory){
        return message;
    }
}