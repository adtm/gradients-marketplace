const GradientMarketplace = artifacts.require("GradientMarketplace");
const GradientToken = artifacts.require("GradientToken");
const {
  BN,
  expectEvent,
  expectRevert
} = require('@openzeppelin/test-helpers');

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
  
});