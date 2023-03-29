// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.0;

import "@thirdweb-dev/contracts/base/ERC1155LazyMint.sol";

contract Game is ERC1155LazyMint {
  constructor(
    string memory _name,
    string memory _symbol,
    address _royaltyRecipient,
    uint128 _royaltyBps
  ) ERC1155LazyMint(name, _symbol, _royaltyRecipient, _royaltyBps) {}

  /*
  @dev claim a level one pickachu to start playing
  */
  function claimLevelOnePickachu() public {
    // run a check to see if the game is active
    claim(msg.sender, 0, 1);
    // emit an event
  }

  function verifyClaim(address _claimer, uint256 _tokenId, uint256 _quantity) public view virtual override {
    // Your custom claim restriction logic
  }
}
