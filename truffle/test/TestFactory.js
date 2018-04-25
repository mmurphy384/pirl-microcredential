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
		var name = 'Classroom Management';
		var code = 'clm-0k12-v1';
		var requirements = 'Submit a bunch of stuff';
		return MicroCredential.deployed().then(function(instance) {
			_instance = MicroCredential.at(instance.address);
			return _instance.createCredential(name,code,requirements,{from:accounts[9]});
		}).then(function (result) {
			assert.isBelow(result.receipt.gasUsed,900000,'Gas did not exceed 900000');
			return _instance.getCredentialCount.call();
		}).then(function (result) {
			console.log('######### Log: Num Credentials = ' + result.toNumber().toString());
			assert.isAbove(result.toNumber(),0,'1 or more credentials defined');
			return _instance.getCredential.call(0);
		}).then(function (results) {
			assert.equal(results[0], name, "The returned contract name is valid");
			assert.equal(results[1], code, "The returned contract code is valid");
			assert.equal(results[2], requirements, "The returned contract requirements is valid");
		})
	});
})
