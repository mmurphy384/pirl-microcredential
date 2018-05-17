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
		var user1 = {
			"firstName":"Patrick",
			"lastName":"Ewing",
			"email":"patrick.ewing@yahoo.com"
		}
		var user2 = {
			"firstName":"John",
			"lastName":"Starks",
			"email":"jstarks@yahoo.com"
		}
		return MicroCredential.deployed().then(function(instance) {
			_instance = MicroCredential.at(instance.address);
			return _instance.registerAgency(_agency.name, _agency.website, _agency.firstName, _agency.lastName, _agency.email, {from:accounts[1]});
		}).then(function (result) {
			console.log('######### Log Users: receipt.gasUsed = ' + result.receipt.gasUsed);
			assert.isBelow(result.receipt.gasUsed,900000,'Gas did not exceed 900000');
			return _instance.addUser(user1.firstName, user1.lastName, user1.email,{from:accounts[8]});
		}).then(function (result) {
			console.log('######### Log Users: Add User1 receipt.gasUsed = ' + result.receipt.gasUsed);
			assert.isBelow(result.receipt.gasUsed,900000,'Gas did not exceed 900000');
			return _instance.addUser(user2.firstName, user2.lastName, user2.email,{from:accounts[7]});
		}).then(function (result) {
			console.log('######### Log Users: Add User2 receipt.gasUsed = ' + result.receipt.gasUsed);
			assert.isBelow(result.receipt.gasUsed,900000,'Gas did not exceed 900000');
			return _instance.getUserById.call(0);
		}).then(function (results) {
			console.log('######### Log Users: getUserById(0) = ' + toAscii(results[0].toString()));
			assert.equal(toAscii(results[0]), user1.firstName, "The returned user first name is valid");
			return _instance.getUserByAddress.call(accounts[7]);
		}).then(function (results) {
			console.log('######### Log Users: getUserByAddress(' + user2.firstName + ') = ' + toAscii(results[0].toString()));
			assert.equal(toAscii(results[0]), user2.firstName, "The returned contract name is valid");
			return  _instance.getIdByAddress.call(accounts[7]);
		}).then(function (result) {
			console.log('######### Log Users: getIdByAddress(' + accounts[7] + ') = ' + result.toNumber());
			assert.equal(result, 1, "The returned id should be 1");
			return  _instance.getIdByEmail.call(user2.email);
		}).then(function (result) {
			console.log('######### Log Users: getIdByEmail(' + user2.email + ') = ' + result.toNumber());
			assert.equal(result, 1, "The returned id should be 1");
			return  _instance.getMyId.call({from : accounts[7]});
		}).then(function (result) {
			console.log('######### Log Users: getMyId(' + accounts[7] + ') = ' + result.toNumber());
			assert.equal(result, 1, "The returned id should be 1");
			return _instance.getUserByEmail.call(user1.email);
		}).then(function (results) {
			console.log('######### Log Users: getUserByEmail(' + user1.email + ') = ' + toAscii(results[0].toString()));
			assert.equal(toAscii(results[0]), user1.firstName, "The returned user first name is valid");			
			return _instance.getUserByAddress.call(accounts[8]);
		}).then(function (results) {
			console.log('######### Log Users: getUserByAddress(0) = ' + toAscii(results[0].toString()));
			assert.equal(toAscii(results[0]), user1.firstName, "The returned user first name is valid");
			return _instance.getUserList.call();
		}).then(function (results) {
			console.log('######### Log Users: getUserList[0][0] = ' + toAscii(results[0][0].toString()));
			console.log('######### Log Users: getUserList[1][0] = ' + toAscii(results[1][0].toString()));
			console.log('######### Log Users: getUserList[2][0] = ' + toAscii(results[2][0].toString()));
			console.log('######### Log Users: getUserList[0][1] = ' + toAscii(results[0][1].toString()));
			console.log('######### Log Users: getUserList[1][1] = ' + toAscii(results[1][1].toString()));
			console.log('######### Log Users: getUserList[2][1] = ' + toAscii(results[2][1].toString()));
			assert.equal(toAscii(results[0][0]), user1.firstName, "The returned user1 first name is valid");
			assert.equal(toAscii(results[0][1]), user2.firstName, "The returned user2 first name is valid");
		}).then(function (results) {
			return _instance.updateUser(user1.firstName, user1.lastName, 'john.starks@pirl.io',{from:accounts[7]});
		}).then(function (result) {
			console.log('######### Log Users: Add User2 receipt.gasUsed = ' + result.receipt.gasUsed);
			assert.isBelow(result.receipt.gasUsed,900000,'Gas did not exceed 900000');
			return _instance.getUserByEmail.call('john.starks@pirl.io');
		}).then(function (results) {
			console.log('######### Log Users: getUserByEmail(john.starks@pirl.io) = ' + toAscii(results[0].toString()));
			//assert.equal(toAscii(results[0]), user1.firstName, "The update user first name is valid");
		});
	});
	
})