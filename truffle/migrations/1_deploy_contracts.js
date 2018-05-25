var MicroCredential = artifacts.require("./MicroCredential.sol");
var Credentials = artifacts.require("./Credentials.sol");
var Users = artifacts.require("./Users.sol");
var Files = artifacts.require("./Files.sol");
var UserSubmissions = artifacts.require("./UserSubmissions.sol");


module.exports = function(deployer) {
  deployer.deploy(MicroCredential);
  deployer.deploy(Credentials);
  deployer.deploy(Users);
  deployer.deploy(Files);
  deployer.deploy(UserSubmissions);
};