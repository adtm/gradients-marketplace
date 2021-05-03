// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

import "./GradientToken.sol";
import "./GradientDomain.sol";


contract GradientMarketplace is GradientDomain {

  struct GradientTransaction {
    uint256 tokenId;
    bool isSellable;
    address payable owner;
    uint256 price;
  }

  address beneficiary;

  GradientToken gradientToken;
  mapping (uint256 => address) gradientOwnerByTokenId;
  mapping (uint256 => GradientTransaction) gradientTransactionByTokenId;
  

  constructor(address tokenAddress, address beneficiaryAddress) {
    gradientToken = GradientToken(tokenAddress);
    beneficiary = beneficiaryAddress;
  }

  function sellGradient(uint256 tokenId, uint256 price) public returns (bool) {
    address ownerAddress = gradientOwnerByTokenId[tokenId];
    require(msg.sender != ownerAddress, "Gradient doesn't belong to you");
    require(price != 0, "Sell price cannot be 0");

    GradientTransaction memory gradientTransaction;
    gradientTransaction.tokenId = tokenId;
    gradientTransaction.isSellable = true;
    gradientTransaction.owner = payable(msg.sender);
    gradientTransaction.price = price;
    
    gradientTransactionByTokenId[tokenId] = gradientTransaction;
    return true;
  }

  function buyGradient(uint256 tokenId) external payable returns (bool) {
    GradientTransaction memory gradient = gradientTransactionByTokenId[tokenId];
    require(gradient.isSellable == true);
    require(msg.value >= gradient.price, "Gradient price is higher than sent amount");

    address payable payableOwner = payable(gradientOwnerByTokenId[tokenId]);
    uint256 payableAmount = msg.value - gradient.price;

    if (!payableOwner.send(payableAmount)) {
      revert();
    }

    gradientToken.safeTransferFrom(payableOwner, msg.sender, tokenId);
    return true;
  }

  function cancelGradientSale(uint256 tokenId) public returns (bool) {
    address ownerAddress = gradientOwnerByTokenId[tokenId];
    require(msg.sender != ownerAddress, "Gradient doesnt belong to you");

    GradientTransaction memory gradientTransaction = gradientTransactionByTokenId[tokenId];
    gradientTransaction.isSellable = false;
    
    gradientTransactionByTokenId[tokenId] = gradientTransaction;
    return true;
  }

}