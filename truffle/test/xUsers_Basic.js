var Users = artifacts.require("./Users.sol");

contract('Users', function(accounts) {
	
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

	it("should create a contract, add 2 users, retrieve 1, get the other by address.", function() {
		var users = [{
				"firstName":"Patrick",
				"lastName":"Ewing",
				"email":"patrick.ewing@yahoo.com",
				"account":6
			},
			{
				"firstName":"John",
				"lastName":"Starks",
				"email":"jstarks@yahoo.com",
				"account":7
			},
			{
				"firstName":"Latrelle",
				"lastName":"Spreewell",
				"email":"lspreewell@yahoo.com",
				"account":8
			}
		]
		return Users.deployed().then(function(instance) {
			_instance = Users.at(instance.address);
			return Promise.all([
				_instance.addUser(users[0].firstName, users[0].lastName, users[0].email,{from:accounts[users[0].account]}),
				_instance.addUser(users[1].firstName, users[1].lastName, users[1].email,{from:accounts[users[1].account]}),
				_instance.addUser(users[2].firstName, users[2].lastName, users[2].email,{from:accounts[users[2].account]}),
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
				_instance.getUserByAddress.call(accounts[users[0].account]),
				_instance.getUserByAddress.call(accounts[users[1].account]),
				_instance.getUserByAddress.call(accounts[users[2].account])
			]);
		}).then(function (results) {
			console.log('Made it here');
			for (var i = 0; i < results.length; i++) {
				console.log('######### Log Users: users[' + i + '] by Address ' + toAscii(results[i][0]) + ' ' + toAscii(results[i][1]));
			}
			assert.equal(toAscii(results[1][0]), users[1].firstName, "The returned user first name is valid");
			return Promise.all([
				_instance.getIdByAddress(accounts[users[0].account]),
				_instance.getIdByAddress(accounts[users[1].account]),
				_instance.getIdByAddress(accounts[users[2].account])
			]);
		}).then(function (results) {
			for (var i = 0; i < results.length; i++) {
				console.log('######### Log getIdByAddress: accounts[' + (5 + i) + '] is ' + results[i].toNumber());
			}
			assert.equal(results[0], 1, "The returned id should be 1");
			assert.equal(results[1], 2, "The returned id should be 2");
			assert.equal(results[2], 3, "The returned id should be 3");
		 	return  _instance.getMyId.call({from : accounts[users[0].account]});
		 }).then(function (result) {
		 	console.log('######### Log Users: getMyId(' + accounts[users[0].account] + ') = ' + result.toNumber());
		 	assert.equal(result.toNumber(), 1, "The returned userID for Patrick Ewing should be 1");
		 	return _instance.updateUser(users[1].firstName, users[1].lastName, 'john.starks1@pirl.io',{from:accounts[7]});
		 }).then(function (result) {
		 	console.log('######### Log Users: Add User2 receipt.gasUsed = ' + result.receipt.gasUsed);
		 	assert.isBelow(result.receipt.gasUsed,900000,'Gas did not exceed 900000');
		 	return _instance.getUserById.call(2);
		 }).then(function (results) {
		 	console.log('######### Log Users: getUserById(john.starks@pirl.io) = ' + toAscii(results[2]));
		 	assert.equal(toAscii(results[2]), 'john.starks1@pirl.io', "The update John Starks email is valid");
		});
	});
	
})