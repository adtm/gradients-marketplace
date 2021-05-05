const GradientToken = artifacts.require("GradientToken");
const GradientDomain = artifacts.require("GradientDomain");
const GradientMarketplace = artifacts.require("GradientMarketplace");

module.exports = async (deployer) => {
  await deployer.deploy(GradientDomain)

  const token = await deployer.deploy(GradientToken);
  await deployer.deploy(GradientMarketplace, token.address);
};