var MicroCredential = artifacts.require("./MicroCredential.sol");
var Credentials = artifacts.require("./Credentials.sol");
var Users = artifacts.require("./Users.sol");
var Files = artifacts.require("./Files.sol");
var UserSubmissions = artifacts.require("./UserSubmissions.sol");


module.exports = function(deployer) {
  deployer.deploy(MicroCredential,{from: "0x90f8bf6a479f320ead074411a4b0e7944ea8c9c1", gas: 6885335});
  deployer.deploy(Credentials,{from: "0x90f8bf6a479f320ead074411a4b0e7944ea8c9c1", gas: 6885335});
  deployer.deploy(Users,{from: "0x90f8bf6a479f320ead074411a4b0e7944ea8c9c1", gas: 6885335});
  deployer.deploy(Files,{from: "0x90f8bf6a479f320ead074411a4b0e7944ea8c9c1", gas: 6885335});
  deployer.deploy(UserSubmissions,{from: "0x90f8bf6a479f320ead074411a4b0e7944ea8c9c1", gas: 6885335});
};