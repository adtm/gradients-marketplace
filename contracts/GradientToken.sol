// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
 

contract GradientToken is ERC721, Ownable {

  struct Gradient {
    string left;
    string right;
  }

  using Counters for Counters.Counter;
  Counters.Counter private tokenIds;

  mapping (uint256 => Gradient) public gradientByTokenId;

  constructor() ERC721("Ichi", "ICHI") {}

  function createGradient(
    string memory left, 
    string memory right
  ) public onlyOwner returns (uint256){
    tokenIds.increment();
    uint256 tokenId = tokenIds.current();

    _mint(msg.sender, tokenId);
    Gradient memory gradient = Gradient(left, right);
    gradientByTokenId[tokenId] = gradient;
    return tokenId;
  }

  function getGradient(uint256 tokenId) public view returns (Gradient memory) {
    return gradientByTokenId[tokenId];
  }
}
 