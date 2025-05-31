// SPDX-License-Identifier: MIT

pragma solidity ^0.8.28;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TestToken is ERC20 {
    constructor() ERC20("Billy Test Token", "BTT") {
        _mint(msg.sender, 101000000 * 10 ** decimals());
    }
}
