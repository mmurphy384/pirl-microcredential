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
	var _agencyId;
	var _agency = {
		"name":"Credential Test",
		"website":"www.micro-credentials-r-us.io",
		"firstName":"Mike",
		"lastName":"Murphy",
		"email":"mmurphy384@yahoo.com"
	}

	it("should create a contract, add 2 credentails, retrieve 1, retrieve both.", function() {
		var creds = [{
				"name":"Agency 1 Classroom Management",
				"url":"https://www.SomeSite.com/Creds1",
				"fee":50,
				"agencyId":1
			},
			{
				"name":"Agency 1 Differentiated Instruction1",
				"url":"https://www.SomeSite.com/Creds2",
				"fee": 50,
				"agencyId":1
			},
			{
				"name":"Agency 0 Dummy 9999999",
				"url":"https://www.SomeSite.com/Creds3",
				"fee": 50,
				"agencyId":0
			},
			{
				"name":"Agency 1 Bloodborne Pathogens3",
				"url":"https://www.SomeSite.com/Creds4",
				"fee": 50,
				"agencyId":1
			}
		]
		return MicroCredential.deployed().then(function(instance) {
			_instance = MicroCredential.at(instance.address);
			return _instance.registerAgency(_agency.name, _agency.website, _agency.firstName, _agency.lastName, _agency.email, {from:accounts[1]});
		}).then(function (result) {
			console.log('######### Log: receipt.gasUsed = ' + result.receipt.gasUsed);
			return _instance.getAgencyInfo.call(_agency.name);
		}).then(function (results) {
			_agencyId = results[6].toNumber();
			console.log('######### Log: agencyId = ' + results[6].toNumber());
			assert.equal(_agencyId, 1, "The returned agencyId is valid");
			return Promise.all([
				_instance.addCredential(creds[0].name, creds[0].url, creds[0].fee,creds[0].agencyId,{from:accounts[1]}),
				_instance.addCredential(creds[1].name, creds[1].url, creds[1].fee,creds[1].agencyId,{from:accounts[1]}),
				_instance.addCredential(creds[2].name, creds[2].url, creds[2].fee,creds[2].agencyId,{from:accounts[1]}),
				_instance.addCredential(creds[3].name, creds[3].url, creds[3].fee,creds[3].agencyId,{from:accounts[1]}),
			]);
		}).then(function (results) {
			console.log('######### Log: Added 4 credentials receipt.gasUsed = ' + results[0].receipt.gasUsed);
			return _instance.getCredentialListByAgencyId.call(creds[1].agencyId);
		}).then(function (results) {
			console.log('######### Log: Not sure what to do');
			for (var i = 0; i < results[0].length; i++) {
				console.log(results[1][i].toNumber() + ' : ' + toAscii(results[0][i]));
			}
		});
	});
	
})