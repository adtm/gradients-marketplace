// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

import "./GradientToken.sol";
import "./GradientDomain.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract GradientMarketplace is GradientDomain {

  using SafeMath for uint256;

  struct SellTransaction {
    uint256 tokenId;
    address payable owner;
    bool forSale;
    uint256 price;
  }

  struct Transaction {
    address owner;
    address buyer;
    uint256 price;
    uint256 date;
  }

  address public beneficiary;
  GradientToken public gradientToken;
  mapping (uint256 => SellTransaction) public sellTransactionByTokenId;
  mapping (uint256 => Transaction[]) public transactionsByTokenId;

  constructor(address tokenAddress, address beneficiaryAddress) {
    gradientToken = GradientToken(tokenAddress); 
    beneficiary = beneficiaryAddress
  }

  modifier onlyGradientOwner(uint256 tokenId) {
    address ownerAddress = gradientToken.ownerOf(tokenId);
    require(msg.sender == ownerAddress, "Gradient doesn't belong to you");
    _;
  }

  function calculatePrice(uint256 price) internal pure returns (uint256 cut, uint256 totalPrice) {
    cut = price.mul(uint256(10)).div(uint256(1000)).mul(uint256(15));
    totalPrice = price.mul(uint256(10)).div(uint256(1000)).mul(uint256(985)); 
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
    SellTransaction memory sellTransaction = sellTransactionByTokenId[tokenId];
    require(sellTransaction.forSale == true, "Gradient is not for sale");
    require(sellTransaction.owner != msg.sender, "Gradient can't be bought by owner");
    require(msg.value >= sellTransaction.price, "Gradient price is higher than sent amount");

    cut, totalPrice = calculatePrice(msg.value);

    if (!sellTransaction.owner.send(totalPrice) || !beneficiary.send(cut)) {
      revert();
    }

    gradientToken.safeTransferFrom(sellTransaction.owner, msg.sender, tokenId);
    delete sellTransactionByTokenId[tokenId];
    
    Transaction memory transaction;
    transaction.owner = sellTransaction.owner;
    transaction.buyer = msg.sender;
    transaction.date = block.timestamp;
    transaction.price = msg.value;

    transactionsByTokenId[tokenId].push(transaction);
    return true;
  }

  function cancelSellGradient(uint256 tokenId) public onlyGradientOwner(tokenId) returns (bool) {
    delete sellTransactionByTokenId[tokenId];
    return true;
  }

  function getTransactionCount(uint256 tokenId) public view returns (uint256 length) {
    return transactionsByTokenId[tokenId].length;
  }

  function getTransaction(uint256 tokenId, uint256 index) public view returns (
    address buyer, 
    address owner, 
    uint256 price, 
    uint256 date
    ) {
    Transaction memory transaction = transactionsByTokenId[tokenId][index];
    owner = transaction.buyer;
    buyer = transaction.owner;
    price = transaction.price;
    date = transaction.date;
  }

}
