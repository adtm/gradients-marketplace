const GradientToken = artifacts.require("GradientToken");
const {
  BN,
  expectEvent,
  expectRevert
} = require('@openzeppelin/test-helpers');

contract("Gradient token", accounts => {

  it("should make deployer as the owner of the token", async () => {
    const instance = await GradientToken.deployed();
    const owner = await instance.owner();

    assert.equal(owner, accounts[0]);
  });

  it("should allow to mint tokens", async () => {
    const instance = await GradientToken.deployed();

    const transaction = await instance.createGradient("#ff00dd", "#ddddff");
    expectEvent(transaction, "CreatedGradient", {
      tokenId: new BN(1)
    });

    const gradientByTokenId = await instance.getGradient(1);
    assert.deepEqual(gradientByTokenId.left, "#ff00dd");
    assert.deepEqual(gradientByTokenId.right, "#ddddff");
  });

  it("should allow to mint tokens only to owner", async () => {
    const instance = await GradientToken.deployed();

    await expectRevert(
      instance.createGradient("#ff00dd", "#ddddff", {
        from: "0xf6a948bff792e4f42d7f17e5e4ebe20871d160f2"
      }),
      "caller is not the owner"
    )
  });

});