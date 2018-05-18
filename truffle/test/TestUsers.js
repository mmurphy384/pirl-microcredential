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

	it("should create a contract, add 2 users, retrieve 1, get the other by address.", function() {
		var users = [{
				"firstName":"Patrick",
				"lastName":"Ewing",
				"email":"patrick.ewing@yahoo.com"
			},
			{
				"firstName":"John",
				"lastName":"Starks",
				"email":"jstarks@yahoo.com"
			},
			{
				"firstName":"Latrelle",
				"lastName":"Spreewell",
				"email":"lspreewell@yahoo.com"
			}
		]
		return MicroCredential.deployed().then(function(instance) {
			_instance = MicroCredential.at(instance.address);
			return _instance.registerAgency(_agency.name, _agency.website, _agency.firstName, _agency.lastName, _agency.email, {from:accounts[1]});
		}).then(function (result) {
			console.log('######### Log Users: receipt.gasUsed = ' + result.receipt.gasUsed);
			assert.isBelow(result.receipt.gasUsed,900000,'Gas did not exceed 900000');
			return Promise.all([
				_instance.addUser(users[0].firstName, users[0].lastName, users[0].email,{from:accounts[6]}),
				_instance.addUser(users[1].firstName, users[1].lastName, users[1].email,{from:accounts[7]}),
				_instance.addUser(users[2].firstName, users[2].lastName, users[2].email,{from:accounts[8]}),
			]); 
		}).then(function (results) {
			console.log('######### Log Users: Added 3 users receipt.gasUsed = ' + results[0].receipt.gasUsed);
			assert.isBelow(results[0].receipt.gasUsed,900000,'Gas did not exceed 900000');
			return Promise.all([
				_instance.getUserById.call(1),
				_instance.getUserById.call(2),
				_instance.getUserById.call(3)
			]); 
		}).then(function (results) {
		 	for (var i = 0; i < results.length; i++) {
		 		console.log('######### Log Users: users[' + i + '] is ' + toAscii(results[i][0]) + ' ' + toAscii(results[i][1]));
			}
			assert.equal(toAscii(results[0][0]), users[0].firstName, "The returned user first name is valid");
			return Promise.all([
				_instance.getUserByAddress.call(accounts[6]),
				_instance.getUserByAddress.call(accounts[7]),
				_instance.getUserByAddress.call(accounts[8])
			]);
		}).then(function (results) {
			for (var i = 0; i < results.length; i++) {
				console.log('######### Log Users: users[' + i + '] by Address ' + toAscii(results[i][0]) + ' ' + toAscii(results[i][1]));
			}
			assert.equal(toAscii(results[1][0]), users[1].firstName, "The returned user first name is valid");
			return Promise.all([
				_instance.getIdByAddress(accounts[6]),
				_instance.getIdByAddress(accounts[7]),
				_instance.getIdByAddress(accounts[8])
			]);
		}).then(function (results) {
			for (var i = 0; i < results.length; i++) {
				console.log('######### Log getIdByAddress: accounts[' + (5 + i) + '] is ' + results[i].toNumber());
			}
			assert.equal(results[0], 1, "The returned id should be 1");
			assert.equal(results[1], 2, "The returned id should be 1");
			assert.equal(results[2], 3, "The returned id should be 1");
			return Promise.all([
				_instance.getIdByEmail.call(users[0].email),
				_instance.getIdByEmail.call(users[1].email),
				_instance.getIdByEmail.call(users[2].email)
			]);
		}).then(function (results) {
			for (var i = 0; i < results.length; i++) {
				console.log('######### Log getIdByEmail: users[' + i + '] is ' + results[i].toNumber());
		 	}
		 	assert.equal(results[1], 2, "The returned id should be 1");
		 	return  _instance.getMyId.call({from : accounts[6]});
		 }).then(function (result) {
		 	console.log('######### Log Users: getMyId(' + accounts[7] + ') = ' + result.toNumber());
		 	assert.equal(result.toNumber(), 1, "The returned id should be 1");
		 	return _instance.getUserList.call();
		 }).then(function (results) {
		 	for (var i = 0; i < results[0].length; i++) {
		 		console.log('######### Log getUserList: users[' + i + '] is ' + toAscii(results[0][i]) + ' ' + toAscii(results[1][i]));
		 	}
		 	assert.equal(toAscii(results[0][3]), users[2].firstName, "The returned user2 first name is valid");
		 	assert.equal(toAscii(results[1][3]), users[2].lastName, "The returned user2 last name is valid");
		 	return _instance.updateUser(users[1].firstName, users[1].lastName, 'john.starks1@pirl.io',{from:accounts[7]});
		 }).then(function (result) {
		 	console.log('######### Log Users: Add User2 receipt.gasUsed = ' + result.receipt.gasUsed);
		 	assert.isBelow(result.receipt.gasUsed,900000,'Gas did not exceed 900000');
		 	return _instance.getUserByEmail.call('john.starks1@pirl.io');
		 }).then(function (results) {
		 	console.log('######### Log Users: getUserByEmail(john.starks@pirl.io) = ' + toAscii(results[0]));
		 	assert.equal(toAscii(results[0]), users[1].firstName, "The update user first name is valid");
		});
	});
	
})