var MicroCredential = artifacts.require("./MicroCredential.sol");


module.exports = function(deployer) {
  deployer.deploy(MicroCredential,web3.eth.accounts[9]);
};