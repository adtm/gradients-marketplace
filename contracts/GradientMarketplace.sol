// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

import "./GradientToken.sol";
import "./GradientDomain.sol";

// @NOTE: get owner gradients
contract GradientMarketplace is GradientDomain {

  struct SellTransaction {
    uint256 tokenId;
    address payable owner;
    bool forSale;
    uint256 price;
  }


  GradientToken public gradientToken;
  mapping (uint256 => SellTransaction) public sellTransactionByTokenId;

  constructor(address tokenAddress) {
    gradientToken = GradientToken(tokenAddress); 
  }

  modifier onlyGradientOwner(uint256 tokenId) {
    address ownerAddress = gradientToken.ownerOf(tokenId);
    require(msg.sender == ownerAddress, "Gradient doesn't belong to you");
    _;
  }

  function sellGradient(uint256 tokenId, uint256 price) public onlyGradientOwner(tokenId) returns (bool) {
    require(price > 0, "Sell price cannot be negative or zero");

    SellTransaction memory transaction;
    transaction.tokenId = tokenId;
    transaction.owner = payable(msg.sender);
    transaction.forSale = true;
    transaction.price = price;
    
    sellTransactionByTokenId[tokenId] = transaction;
    return true;
  }

  function buyGradient(uint256 tokenId) external payable returns (bool) {
    SellTransaction memory transaction = sellTransactionByTokenId[tokenId];
    require(transaction.forSale == true, "Gradient is not for sale");
    require(transaction.owner != msg.sender, "Gradient can't be bought by owner");
    require(msg.value >= transaction.price, "Gradient price is higher than sent amount");

    uint256 payableAmount = msg.value - transaction.price;

    if (!transaction.owner.send(payableAmount)) {
      revert();
    }

    gradientToken.safeTransferFrom(transaction.owner, msg.sender, tokenId);
    delete sellTransactionByTokenId[tokenId];
    return true;
  }

  function cancelSellGradient(uint256 tokenId) public onlyGradientOwner(tokenId) returns (bool) {
    delete sellTransactionByTokenId[tokenId];
    return true;
  }

}