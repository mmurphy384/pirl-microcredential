var Factory = artifacts.require("./Factory.sol");
var App = artifacts.require("./Factory.sol");

contract('Factory', function(accounts) {
	var _factory;
	it("should create a contract and return an address", function() {
		return Factory.deployed().then(function(instance) {
			_factory = Factory.at(instance.address);
			return _factory.deployNewContract({'to':instance.address,'from':accounts[0]});
		}).then(function (result) {
			console.log('######### Log: Receipt = ' + result.toString());
			assert.isBelow(result.receipt.gasUsed,900000,'Gas did not exceed 900000');
			return _factory.getContractAddress.call();
		}).then(function (result) {
			console.log('######### Log: Contract Address = ' + result.toString());
			assert.equal(result.valueOf().length, 42, "A valid contract was received");
			var _app = App.at(result);
			return _app.getOwner.call();
		}).then(function (result) {
			console.log('######### Log: Owner = ' + result.toString());
			assert.equal(result.toString(),accounts[0].toString(),"The owner is valid");
		});
	});
})
