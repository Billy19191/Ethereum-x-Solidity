//SPDX-License-Identifier: MIT

pragma solidity 0.8.30;

contract Lottery {
    address public manager;
    address[] public players;

    constructor() {
        manager = msg.sender;
    }

    function enter() public payable {
        require(msg.value > 0.001 ether);
        players.push(msg.sender);
    }

    function random() private view returns (uint) {
        return
            uint(
                keccak256(
                    abi.encodePacked(block.prevrandao, block.timestamp, players)
                )
            );
    }
    function pickWinner() public returns (address) {
        uint winnerIndex = random() % players.length;
        address payable winner = payable(players[winnerIndex]);
        winner.transfer(address(this).balance);
        players = new address[](0);
        return winner;
    }
}
