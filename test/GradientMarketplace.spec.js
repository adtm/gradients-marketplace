const GradientMarketplace = artifacts.require("GradientMarketplace");
const GradientToken = artifacts.require("GradientToken");
const {
  BN,
  expectEvent,
  expectRevert
} = require('@openzeppelin/test-helpers');
<<<<<<< Updated upstream
=======
const faker = require("faker");

// @NOTE: cleanups
// @NOTE: random values
>>>>>>> Stashed changes

contract("Gradient marketplace", accounts => {

  let tokenInstance;
  let markeplaceInstance;

  const tokenId = new BN(1);
  const price = new BN(20);

  beforeEach(async () => {
    tokenInstance = await GradientToken.deployed();
    markeplaceInstance = await GradientMarketplace.deployed(tokenInstance.address);
  })

  it("should receive nft address on constructor", async () => {
    const passedTokenAddress = await markeplaceInstance.gradientToken();
    assert.equal(passedTokenAddress, tokenInstance.address);
  });


  describe("sellGradient", () => {

    it("should put a gradient for sale by owner", async () => {
      await tokenInstance.createGradient("A", "A", { from: accounts[0] });
      await markeplaceInstance.sellGradient(tokenId, price, {
        from: accounts[0]
      });

      const result = await markeplaceInstance.sellTransactionByTokenId.call(1);
      assert.deepEqual(result[0].toString(), tokenId.toString());
      assert.deepEqual(result[1].toString(), accounts[0].toString());
      assert.deepEqual(result[2], true);
      assert.deepEqual(result[3].toString(), price.toString());
    })

    it("shouldn't allow to sell gradient to not an owner", async () => {
      await tokenInstance.createGradient("A", "A", { from: accounts[0] });

      await expectRevert(
        markeplaceInstance.sellGradient(new BN(1), new BN(20), {
          from: accounts[1]
        }),
        "Gradient doesn't belong to you"
      );
    });

    it("shouldn't allow to sell gradient for 0 price", async () => {
      await tokenInstance.createGradient("A", "A", { from: accounts[0] });

      await expectRevert(
        markeplaceInstance.sellGradient(new BN(1), new BN(0), {
          from: accounts[0]
        }),
        "Sell price cannot be negative or zero"
      );
    });
  })

  describe("cancelSellGradient", () => {

    it("shouldn't allow to cancel a gradient sale to not an owner", async () => {
      await tokenInstance.createGradient("A", "A", { from: accounts[0] });
      await markeplaceInstance.sellGradient(tokenId, price, {
        from: accounts[0]
      });

      await  markeplaceInstance.cancelSellGradient(new BN(1), {
        from: accounts[0]
      });

      const result = await markeplaceInstance.sellTransactionByTokenId.call(1);
      assert.deepEqual(result[0].toString(), '0');
      assert.deepEqual(result[1].toString(), '0x0000000000000000000000000000000000000000');
      assert.deepEqual(result[2], false);
      assert.deepEqual(result[3].toString(), '0');
    });

    it("shouldn't allow to cancel a gradient sale to not an owner", async () => {
      await tokenInstance.createGradient("A", "A", { from: accounts[0] });
      await markeplaceInstance.sellGradient(tokenId, price, {
        from: accounts[0]
      });

      await expectRevert(
        markeplaceInstance.cancelSellGradient(new BN(1), {
          from: accounts[1]
        }),
        "Gradient doesn't belong to you"
      );
    });
  });

  describe("buyGradient", () => {

    it("shouldn't allow to buy a gradient, which is not for sale", async () => {
      await tokenInstance.createGradient(leftColor, rightColor, { from: accounts[0] });

      await expectRevert(
        markeplaceInstance.buyGradient(new BN(6), {
          from: accounts[1]
        }),
        "Gradient is not for sale"
      );  
    });

    it("shouldn't allow to buy an own gradient for the owner", async () => {
      await tokenInstance.createGradient(leftColor, rightColor, { from: accounts[0] });
      await markeplaceInstance.sellGradient(new BN(7), price, {
        from: accounts[0]
      });

      await expectRevert(
        markeplaceInstance.buyGradient(new BN(7), {
          from: accounts[0]
        }),
        "Gradient can't be bought by owner"
      );  
    });

    it("should fail if sent transaction value is lower than gradient price", async () => {
      await tokenInstance.createGradient(leftColor, rightColor, { from: accounts[0] });
      await markeplaceInstance.sellGradient(new BN(8), price, {
        from: accounts[0]
      });

      await expectRevert(
        markeplaceInstance.buyGradient(new BN(8), {
          from: accounts[1],
          value: 1
        }),
        "Gradient price is higher than sent amount"
      );  
    });

    it("should buy a gradient when the seller approves it", async() => {
      await tokenInstance.createGradient(leftColor, rightColor, { from: accounts[0] });
      await markeplaceInstance.sellGradient(new BN(9), price, {
        from: accounts[0]
      });
      const tokenOwner = await tokenInstance.ownerOf(new BN(9));
      assert.deepEqual(tokenOwner, accounts[0]);

      await tokenInstance.approve(markeplaceInstance.address, new BN(9), { from: accounts[0] });
      await markeplaceInstance.buyGradient(new BN(9), {
        from: accounts[1],
        value: 200
      });
      
      const transferredOwner = await tokenInstance.ownerOf(new BN(9));
      assert.deepEqual(transferredOwner, accounts[1]);
    });
  });
});