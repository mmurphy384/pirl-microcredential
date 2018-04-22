var Factory = artifacts.require("./Factory.sol");
var App = artifacts.require("./Factory.sol");


module.exports = function(deployer) {
  deployer.deploy(Factory);
  deployer.link(Factory, App);
  deployer.deploy(App);
};