// SPDX-License-Identifier: MIT

pragma solidity ^0.8.28;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Lending {
    address public immutable owners;
    uint256 public totalDeposit = 0;
    uint256 public totalBorrow = 0;
    IERC20 public immutable token;
    mapping(address => uint256) public depositList;

    uint256 public liquidityIndex = 1e18;
    uint256 public lastUpdateTime;
    mapping(address => uint256) public userDepositIndex;

    constructor(address _tokenAddress) {
        owners = msg.sender;
        token = IERC20(_tokenAddress);
        lastUpdateTime = block.timestamp;
    }

    function getCurrentBorrowRate() public view returns (uint256) {
        if (totalDeposit == 0) return 0;

        uint256 utilizationRate = (totalBorrow * 1e18) / totalDeposit;
        // Simple rate model: 2% base + (utilization * 8%)
        uint256 baseRate = 2e16;
        uint256 slope = 8e16;

        return baseRate + (utilizationRate * slope) / 1e18;
    }

    function updateGlobalIndex() internal {
        uint256 timeElapse = block.timestamp - lastUpdateTime;
        if (timeElapse > 0 && totalBorrow > 0) {
            uint256 borrowRate = getCurrentBorrowRate();
            uint256 totalInterestEarned = (totalBorrow *
                borrowRate *
                timeElapse) / (365 days * 1e18);
            liquidityIndex +=
                (liquidityIndex * totalInterestEarned) /
                totalDeposit;
        }
        lastUpdateTime = block.timestamp;
    }

    function depositTokens(uint256 _amount) public {
        require(
            token.balanceOf(msg.sender) >= _amount,
            "Insufficient Balance."
        );

        require(
            token.transferFrom(msg.sender, address(this), _amount),
            "Token transferFrom failed"
        );

        updateGlobalIndex();
        //Like share holder allocation
        uint256 scaledAmount = (_amount * 1e18) / liquidityIndex;
        depositList[msg.sender] += scaledAmount;

        totalDeposit += _amount;
    }

    function borrowTokens() public {}

    function withdrawTokens(uint256 _amount) public {
        require(
            (depositList[msg.sender] * liquidityIndex) / 1e18 >= _amount,
            "You don't have enough deposited"
        );

        require(token.transfer(msg.sender, _amount), "Token transfer failed");
        uint256 scaledAmount = (_amount * 1e18) / liquidityIndex;
        depositList[msg.sender] -= scaledAmount;
    }
}
