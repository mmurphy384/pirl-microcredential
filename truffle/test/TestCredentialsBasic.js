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
	var agencies = [
		{
		"name":"Pat Ewings MC Test1",
		"website":"www.micro-credentials-r-us.io",
		"firstName":"Patrick",
		"lastName":"Ewing",
		"email":"p.ewing@yahoo.com"
		},
		{
		"name":"John Starcs MC Test2",
		"website":"www.micro-credentials-r-us.io",
		"firstName":"John",
		"lastName":"Starks",
		"email":"jstarks@yahoo.com"
		},
		{
		"name":"Latrells MC Test3",
		"website":"www.micro-credentials-r-us.io",
		"firstName":"Latrelle",
		"lastName":"Spreewell",
		"email":"lspreewell@yahoo.com"
		}
	];

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
			return Promise.all([
				_instance.registerAgency(agencies[0].name, agencies[0].website, agencies[0].firstName, agencies[0].lastName, agencies[0].email, {from:accounts[1]}),
				_instance.registerAgency(agencies[1].name, agencies[1].website, agencies[1].firstName, agencies[1].lastName, agencies[1].email, {from:accounts[2]}),
				_instance.registerAgency(agencies[2].name, agencies[2].website, agencies[2].firstName, agencies[2].lastName, agencies[2].email, {from:accounts[3]}),
			]);
		}).then(function (results) {
			console.log('######### Log: Created 3 agencies.  receipt.gasUsed = ' + results[0].receipt.gasUsed);
			return _instance.getAgencyInfoByAddress.call(accounts[2]);
		}).then(function (result) {
			console.log('######### Log: agencies[1] = ' + toAscii(result[0]));
			return _instance.addCredential(cred1.name, cred1.url, cred1.fee,{from:accounts[2]});
		}).then(function (result) {
			console.log('######### Log: receipt.gasUsed = ' + result.receipt.gasUsed);
			assert.isBelow(result.receipt.gasUsed,900000,'Gas did not exceed 900000');
			return _instance.addCredential(cred2.name, cred2.url, cred2.fee,{from:accounts[2]});
		}).then(function (result) {
			console.log('######### Log: receipt.gasUsed = ' + result.receipt.gasUsed);
			assert.isBelow(result.receipt.gasUsed,900000,'Gas did not exceed 900000');
			return _instance.getCredentialById.call(1);
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