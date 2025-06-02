// SPDX-License-Identifier: MIT

pragma solidity ^0.8.28;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Lending {
    address public immutable owners;
    uint256 public totalDeposit = 0;
    IERC20 public token;
    mapping(address => uint256) public depositList;

    constructor(address _tokenAddress) {
        owners = msg.sender;
        token = IERC20(_tokenAddress);
    }

    function depositTokens(uint256 _amount) public {
        require(
            token.balanceOf(msg.sender) >= _amount,
            "Insufficient Balance."
        );

        require(
            token.transferFrom(msg.sender, address(this), _amount),
            "Transfer failed"
        );

        depositList[msg.sender] += _amount;
        totalDeposit += _amount;
    }

    function withdrawTokens(uint256 _amount) public {
        require(
            depositList[msg.sender] >= _amount,
            "You don't have enough deposited"
        );
        require(_amount <= totalDeposit, "Insufficient balance");
        require(token.transfer(msg.sender, _amount), "Transfer fund failed");
        depositList[msg.sender] -= _amount;
        totalDeposit -= _amount;
    }
}
