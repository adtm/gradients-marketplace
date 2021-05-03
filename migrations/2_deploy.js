const GradientToken = artifacts.require("GradientToken");
const GradientDomain = artifacts.require("GradientDomain");
// const GradientMarketplace  = artifacts.require("GradientMarketplace");

module.exports = function(deployer) {
  deployer.deploy(GradientDomain);
  deployer.deploy(GradientToken);
  // deployer.deploy(GradientMarketplace);
};