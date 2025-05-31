// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract BasicLendingPool {
    IERC20 public immutable depositToken;
    uint256 public totalDeposit;
    mapping(address => uint256) public userDeposits;

    constructor(address _depositeTokens) {
        depositToken = IERC20(_depositeTokens);
    }
}
