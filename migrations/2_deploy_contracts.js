var ChainContract = artifacts.require("ChainContract.sol");
var DinnerContract = artifacts.require("DinnerContract.sol");

module.exports = function(deployer) {
  deployer.deploy(ChainContract);
  deployer.deploy(DinnerContract);
};
