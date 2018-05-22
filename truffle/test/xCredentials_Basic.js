var Credentials = artifacts.require("./Credentials.sol");

contract('Credentials', function(accounts) {
	
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
	var creds = [
		{
			"id":1,
			"agencyId":1,
			"name":"Credential 1",
			"url":"https://www.SomeSite.com/Creds1",
			"fee":50,
			"account":1
		},
		{
			"id":2,
			"agencyId":1,
			"name":"Credential 2",
			"url":"https://www.SomeSite.com/Creds2",
			"fee": 50,
			"account":2
		},
		{
			"id":3,
			"agencyId":1,
			"name":"Credential 3",
			"url":"https://www.SomeSite.com/Creds3",
			"fee": 50,
			"account":1
		},
		{
			"id":4,
			"agencyId":1,
			"name":"Credential 4",
			"url":"https://www.SomeSite.com/Creds4",
			"fee": 50,
			"account":1
		},
		{
			"id":5,
			"agencyId":2,
			"name":"Credential 5",
			"url":"https://www.SomeSite.com/Creds5",
			"fee": 50,
			"account":2
		},
		{
			"id":6,
			"agencyId":2,
			"name":"Credential 6",
			"url":"https://www.SomeSite.com/Creds6",
			"fee": 50,
			"account":2
		},
		{
			"id":7,
			"agencyId":2,
			"name":"Credential 7",
			"url":"https://www.SomeSite.com/Creds7",
			"fee": 50,
			"account":2
		},
		{
			"id":8,
			"agencyId":2,
			"name":"Credential 8",
			"url":"https://www.SomeSite.com/Creds8",
			"fee": 50,
			"account":2
		}
	];

	it("should create a contract, add 8 credentails, retrieve 1, retrieve both.", function() {
		return Credentials.deployed().then(function(instance) {
			_instance = Credentials.at(instance.address);
			return Promise.all([
				_instance.addCredential(creds[0].name, creds[0].url, creds[0].fee,creds[0].agencyId,{from:accounts[creds[0].account]}),
				_instance.addCredential(creds[1].name, creds[1].url, creds[1].fee,creds[1].agencyId,{from:accounts[creds[1].account]}),
				_instance.addCredential(creds[2].name, creds[2].url, creds[2].fee,creds[2].agencyId,{from:accounts[creds[2].account]}),
				_instance.addCredential(creds[3].name, creds[3].url, creds[3].fee,creds[3].agencyId,{from:accounts[creds[3].account]}),
				_instance.addCredential(creds[4].name, creds[4].url, creds[4].fee,creds[4].agencyId,{from:accounts[creds[4].account]}),
				_instance.addCredential(creds[5].name, creds[5].url, creds[5].fee,creds[5].agencyId,{from:accounts[creds[5].account]}),
				_instance.addCredential(creds[6].name, creds[6].url, creds[6].fee,creds[6].agencyId,{from:accounts[creds[6].account]}),
				_instance.addCredential(creds[7].name, creds[7].url, creds[7].fee,creds[7].agencyId,{from:accounts[creds[7].account]})
			]);
		}).then(function (result) {
			console.log('######### Log: Added 8 credentials.  receipt.gasUsed = ' + result[0].receipt.gasUsed);
			return _instance.getCredentialById.call(creds[1].id);
		}).then(function (results) {
			console.log('######### Log: getCredentialById(2) = ' + toAscii(results[0].toString()));
			assert.equal(toAscii(results[0]), creds[1].name, "The returned contract name is valid");
			return _instance.getCredentialListByAgencyId(creds[4].agencyId);
		}).then(function (results) {
			for (var i=0; i<results[0].length; i++) {
				console.log('######### Log: Agency 2 = ' + results[1][i].toNumber() + ' : ' + toAscii(results[0][i].toString()));
				assert.equal(results[1][i].toNumber(),creds[i+4].id,'The returned credential is in the correct agency');
			}
			return _instance.updateCredentialById(creds[4].id, "Updated Credential Name", creds[5].url, creds[5].fee,true,{from:accounts[creds[5].account]});	
		}).then(function (result) {
			console.log('######### Log: Added 8 credentials.  receipt.gasUsed = ' + result.receipt.gasUsed);
			return _instance.getCredentialById.call(creds[4].id);
		}).then(function (results) {
			console.log('######### Log: getCredentialById(5) = ' + toAscii(results[0].toString()));
			assert.equal(toAscii(results[0]), "Updated Credential Name", "The changed contract name is valid");
		});
	});
	
})