const GradientToken = artifacts.require("GradientToken");

contract("Gradient token", accounts => {

  it("Should make first account an owner", async () => {
    const instance = await GradientToken.deployed();
    const owner = await instance.owner();
    assert.equal(owner, accounts[0]);
  });

});