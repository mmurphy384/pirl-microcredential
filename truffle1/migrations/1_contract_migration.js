var Migrations = artifacts.require("./MicroCredential.sol");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
};
