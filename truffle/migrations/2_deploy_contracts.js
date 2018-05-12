var MicroCredential = artifacts.require("./MicroCredential.sol");
var MyUtils = artifacts.require("./MyUtils.sol");
var Credentials = artifacts.require("./Credentials.sol");


module.exports = function(deployer) {
  deployer.deploy(MicroCredential,web3.eth.accounts[9]);
  deployer.deploy(MyUtils,web3.eth.accounts[9]);
  deployer.deploy(Credentials,web3.eth.accounts[9]);
};