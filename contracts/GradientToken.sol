// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./GradientDomain.sol";


contract GradientToken is ERC721, ERC721Enumerable, Ownable, GradientDomain {

  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

  mapping (bytes32 => bool) usedGradients;
  mapping (uint256 => Gradient) gradientById;

  constructor(string memory name, string memory symbol) 
    ERC721(name, symbol) {}


  function createGradient(string memory left, string memory right) public onlyOwner returns (uint256) {
    bytes32 gradientHash = keccak256(abi.encodePacked(left, right));
    require(usedGradients[gradientHash] == false, "Gradient already exists");
    
    uint256 _id = _tokenIds.current();
    Gradient memory gradient = Gradient(left, right);
    
    _mint(msg.sender, _id);
    gradientById[_id] = gradient;
    usedGradients[gradientHash] = true;
    _tokenIds.increment();
    
    emit CreatedGradient(_id);
    return _id;
  }

  function getGradient(uint256 _id) public view returns (string memory left, string memory right, address owner) {
    Gradient memory gradient = gradientById[_id];
    owner = ownerOf(_id);
    left = gradient.left;
    right = gradient.right;
  }
 
  function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721Enumerable) returns (bool) {
    return super.supportsInterface(interfaceId);
  }
 
  function _beforeTokenTransfer(address from, address to, uint256 tokenId) internal override(ERC721, ERC721Enumerable) {
    super._beforeTokenTransfer(from, to, tokenId);
  }
 
  event CreatedGradient(uint256 tokenId);
}
