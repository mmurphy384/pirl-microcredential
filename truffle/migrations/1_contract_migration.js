var MicroCredential = artifacts.require("./MicroCredential.sol");
var Users = artifacts.require("./Users.sol");

module.exports = function(deployer) {
  deployer.deploy(MicroCredential);
  deployer.deploy(Users);
};
