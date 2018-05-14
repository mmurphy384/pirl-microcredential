var MicroCredential = artifacts.require("./MicroCredential.sol");
var MyUtils = artifacts.require("./MyUtils.sol");
var Credentials = artifacts.require("./Credentials.sol");
var Users = artifacts.require("./Users.sol");


module.exports = function(deployer) {
  deployer.deploy(MicroCredential,web3.eth.accounts[9]);
  deployer.deploy(MyUtils,web3.eth.accounts[9]);
  deployer.deploy(Credentials,web3.eth.accounts[9]);
  deployer.deploy(Users,web3.eth.accounts[9]);
};