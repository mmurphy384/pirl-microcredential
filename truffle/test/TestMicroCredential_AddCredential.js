var MicroCredential = artifacts.require("./MicroCredential.sol");

contract('MicroCredential', function(accounts) {
	
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
	var _agency = {
		"name":"Credential Test",
		"website":"www.micro-credentials-r-us.io",
		"firstName":"Mike",
		"lastName":"Murphy",
		"email":"mmurphy384@yahoo.com"
	}

	it("should create a contract, add 2 credentails, retrieve 1, retrieve both.", function() {
		var cred1 = {
			"name":"Classroom Management",
			"url":"https://www.SomeSite.com/Creds1",
			"fee":50
		}
		var cred2 = {
			"name":"Differentiated Instruction",
			"url":"https://www.SomeSite.com/Creds2",
			"fee": 50
		}
		return MicroCredential.deployed().then(function(instance) {
			_instance = MicroCredential.at(instance.address);
			return _instance.registerAgency(_agency.name, _agency.website, _agency.firstName, _agency.lastName, _agency.email, {from:accounts[1]});
		}).then(function (result) {
			console.log('######### Log: receipt.gasUsed = ' + result.receipt.gasUsed);
			assert.isBelow(result.receipt.gasUsed,900000,'Gas did not exceed 900000');
			return _instance.getAgencyInfo.call(_agency.name);
		}).then(function (result) {
			console.log('######### Log: agency[0] = ' + toAscii(result[0]));
			return _instance.addCredential(cred1.name, cred1.url, cred1.fee,{from:accounts[9]});
		}).then(function (result) {
			console.log('######### Log: receipt.gasUsed = ' + result.receipt.gasUsed);
			assert.isBelow(result.receipt.gasUsed,900000,'Gas did not exceed 900000');
			return _instance.addCredential(cred2.name, cred2.url, cred2.fee,{from:accounts[9]});
		}).then(function (result) {
			console.log('######### Log: receipt.gasUsed = ' + result.receipt.gasUsed);
			assert.isBelow(result.receipt.gasUsed,900000,'Gas did not exceed 900000');
			return _instance.getCredentialById.call(0);
		}).then(function (results) {
			console.log('######### Log: getCredentialById(0) = ' + toAscii(results[0].toString()));
			assert.equal(toAscii(results[0]), cred1.name, "The returned contract name is valid");
			return _instance.getCredentialByName.call(cred1.name);
		}).then(function (results) {
			console.log('######### Log: getCredentialByName(' + cred1.name + ') = ' + toAscii(results[0].toString()));
			assert.equal(toAscii(results[0]), cred1.name, "The returned contract name is valid");
		});
	});
	
})