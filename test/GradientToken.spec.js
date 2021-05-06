const GradientToken = artifacts.require("GradientToken");
const {
  BN,
  expectEvent,
  expectRevert
} = require('@openzeppelin/test-helpers');
const faker = require("faker");

// @NOTE: make a test and fix duplicate gradient minting
contract("Gradient token", accounts => {

  let leftColor;
  let rightColor;

  beforeEach(async () => { 
    leftColor = faker.commerce.color();
    rightColor = faker.commerce.color();
  })

  it("should make deployer as the owner of the token", async () => {
    const instance = await GradientToken.deployed();
    const owner = await instance.owner();

    assert.equal(owner, accounts[0]);
  });

  it("should allow to mint tokens", async () => {
    const instance = await GradientToken.deployed();

    const transaction = await instance.createGradient(leftColor, rightColor);
    expectEvent(transaction, "CreatedGradient", {
      tokenId: new BN(1)
    });

    const gradientByTokenId = await instance.getGradient(1);
    assert.deepEqual(gradientByTokenId.left, leftColor);
    assert.deepEqual(gradientByTokenId.right, rightColor);
  });

  it("should allow to mint tokens only to owner", async () => {
    const instance = await GradientToken.deployed();

    await expectRevert(
      instance.createGradient(leftColor, rightColor, {
        from: accounts[1]
      }),
      "caller is not the owner"
    )
  });

  it("should not allow to mint already existing gradient", async () => {
    const instance = await GradientToken.deployed();
    await instance.createGradient(leftColor, rightColor);

    await expectRevert(
      instance.createGradient(leftColor, rightColor, {
        from: accounts[0]
      }),
      "Gradient already exists"
    )
  });
});