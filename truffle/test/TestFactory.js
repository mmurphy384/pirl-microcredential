var MicroCredential = artifacts.require("./MicroCredential.sol");

contract('Factory', function(accounts) {
	
	var _instance;
	
	it("should create a contract and verify that the owner is set properly", function() {
		return MicroCredential.deployed().then(function(instance) {
			_instance = MicroCredential.at(instance.address);
			return _instance.getOwner.call();
		}).then(function (result) {
			console.log('######### Log: Owner = ' + result);
			console.log('######### Log: Acct9 = ' + accounts[9]);
			assert.equal(result, accounts[9], "A valid contract was received");
			return _instance.getCreator.call();
		}).then(function (result) {
			console.log('######### Log: Creator = ' + result);
			assert.equal(result, accounts[0], "A valid contract was received");
		})
	});
	
	it("should add a credential and retrieve it", function() {
		return MicroCredential.deployed().then(function(instance) {
			_instance = MicroCredential.at(instance.address);
			return _instance.createCredential('Classroom Management','clm-0k12-v1','Submit a bunch of stuff',{from:accounts[9]});
		}).then(function (result) {
			assert.isBelow(result.receipt.gasUsed,900000,'Gas did not exceed 900000');
			return _instance.getCredentialCount.call();
		}).then(function (result) {
			console.log('######### Log: Num Credentials = ' + result.toNumber().toString());
			assert.isAbove(result.toNumber(),0,'1 or more credentials defined');

		})
	});
})
