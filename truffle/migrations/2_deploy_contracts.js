var MicroCredential = artifacts.require("./MicroCredential.sol");
var MyUtils = artifacts.require("./MyUtils.sol");
var Credentials = artifacts.require("./Credentials.sol");
var Users = artifacts.require("./Users.sol");


module.exports = function(deployer) {
  deployer.deploy(MicroCredential);
  deployer.deploy(MyUtils);
  deployer.deploy(Credentials);
  deployer.deploy(Users);
};