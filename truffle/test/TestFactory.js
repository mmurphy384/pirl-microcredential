var MicroCredential = artifacts.require("./MicroCredential.sol");

contract('Factory', function(accounts) {
	

	function toAscii(hex) {
		var str = '',
			i = 0,
			l = hex.length;
		if (hex.substring(0, 2) === '0x') {
			i = 2;
		}
		for (; i < l; i+=2) {
			var code = parseInt(hex.substr(i, 2), 16);
			if (code === 0) continue; // this is added
			str += String.fromCharCode(code);
		}
		return str;
	};


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
	
	it("should add two credentials and retrieve them", function() {
		var cred1 = {
			"name":"Classroom Management",
			"code":"clm-0k12-v1",
			"requirements":"Submit a bunch of stuff"
		}
		var cred2 = {
			"name":"Differentiated Instruction",
			"code":"dif-0912-v4",
			"requirements":"Stuff for Differentiated Instuction"
		}
		return MicroCredential.deployed().then(function(instance) {
			_instance = MicroCredential.at(instance.address);
			return _instance.createCredential(cred1.name,cred1.code,cred1.requirements,{from:accounts[9]});
		}).then(function (result) {
			assert.isBelow(result.receipt.gasUsed,900000,'Gas did not exceed 900000');
			return _instance.createCredential(cred2.name,cred2.code,cred2.requirements,{from:accounts[9]});
		}).then(function (result) {
			return _instance.getCredentialCount.call();
		}).then(function (result) {
			console.log('######### Log: getCredentialCount() = ' + result.toNumber().toString());
			assert.equal(result.toNumber(),2,'2 credentials defined');
			return _instance.getCredential.call(0);
		}).then(function (results) {
			console.log('######### Log: Credentials[0].name = ' + results[0].toString());
			console.log('######### Log: Credential[0].code = ' + results[1].toString());
			assert.equal(results[0], cred1.name, "The returned contract name is valid");
			assert.equal(results[1], cred1.code, "The returned contract code is valid");
			assert.equal(results[2], cred1.requirements, "The returned contract requirements is valid");
			return _instance.getCredential.call(1);
		}).then(function (results) {
			console.log('######### Log: Credentials[1].name = ' + results[0].toString());
			console.log('######### Log: Credential[1].code = ' + results[1].toString());
			assert.equal(results[0], cred2.name, "The returned contract name is valid");
			assert.equal(results[1], cred2.code, "The returned contract code is valid");
			assert.equal(results[2], cred2.requirements, "The returned contract requirements is valid");
			return _instance.getCredentialCount.call();
		}).then(function (result) {
			console.log('######### Log: getCredentialCount() = ' + result.toNumber().toString());
			assert.equal(result.toNumber(),2,'2 credentials defined');
			return _instance.getCredentialList.call();
		}).then(function (results) {
			console.log('######### Log: toAscii(results[0][0]) = ' +  String(results[0]));
			console.log('######### Log: results.length = ' +  results[0][1].length);
			assert.equal(toAscii(results[0]), cred1.name, "The returned contract name is valid");
			//assert.equal(toAscii(results[1]), cred2.name, "The returned contract name is valid");
			//console.log('######### Log: Num getCredentialList.code = ' + results[1]);
			//console.log('######### Log: Num getCredentialList.requirements = ' + results[2]);
		})
	});
})
