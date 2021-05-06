// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./GradientDomain.sol";

contract GradientToken is ERC721, Ownable, GradientDomain {

  using Counters for Counters.Counter;
  Counters.Counter private tokenIds;

  Gradient[] allGradients;
  mapping (bytes32 => bool) usedGradients;
  mapping (uint256 => Gradient) public gradientByTokenId;

  constructor(string memory name, string memory symbol) ERC721(name, symbol) {}

  function createGradient(string memory left, string memory right) public onlyOwner returns (uint256) {
    bytes32 gradientHash = keccak256(abi.encodePacked(left, right));
    require(usedGradients[gradientHash] == false, "Gradient already exists");

    tokenIds.increment();
    uint256 tokenId = tokenIds.current();

    _mint(msg.sender, tokenId);
    Gradient memory gradient = Gradient(left, right);
    gradientByTokenId[tokenId] = gradient;
    usedGradients[gradientHash] = true;
    allGradients.push(gradient);

    emit CreatedGradient(tokenId);
    return tokenId;
  }

  function getGradient(uint256 tokenId) public view returns (string memory left, string memory right) {
    Gradient memory gradient = gradientByTokenId[tokenId];
    return (gradient.left, gradient.right);
  }

  function getAllGradients() public view returns (Gradient[] memory) {
    return allGradients;
  }

  event CreatedGradient(uint256 tokenId);
}
 