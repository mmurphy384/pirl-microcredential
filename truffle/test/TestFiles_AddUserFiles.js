var Files = artifacts.require("./Files.sol");

contract('Files', function(accounts) {
	
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
	var agencies = [{
		"name":"Acme MicroCredentials",
		"website":"www.micro-credentials-r-us.io",
		"firstName":"Mike",
		"lastName":"Murphy",
		"email":"mmurphy384@yahoo.com",
		"account":5
	},
	{
		"name":"SomeOther Place",
		"website":"www.micro-credentials-r-us.io",
		"firstName":"Larry",
		"lastName":"Johnson",
		"email":"ljohnson@yahoo.com",
		"account":6
	},
	{
		"name":"NYSUT Teachers Union",
		"website":"www.micro-credentials-r-us.io",
		"firstName":"Larry",
		"lastName":"Johnson",
		"email":"ljohnson@yahoo.com",
		"account":7
	}
];

var files = [
	{
		"name":"Agency or User 1 File 1",
		"url":"https://www.acme.com/Creds1",
		"pirlFileHash":"",
		"isActive":true,
		"userId":1,
		"userSubmissionId":0,
		"agencyId":0
	},
	{
		"name":"Agency or User 1 File 2",
		"url":"https://www.acme.com/Creds1",
		"pirlFileHash":"",
		"isActive":true,
		"userId":1,
		"userSubmissionId":0,
		"agencyId":0
	},
	{
		"name":"Agency or User 2 File 1",
		"url":"https://www.acme.com/Creds1",
		"pirlFileHash":"",
		"isActive":true,
		"userId":2,
		"userSubmissionId":0,
		"agencyId":0
	},
	{
		"name":"Agency or User 2 File 2",
		"url":"https://www.SomeSite.com/Creds1",
		"pirlFileHash":"",
		"isActive":true,
		"userId":2,
		"userSubmissionId":0,
		"agencyId":0
	},
	{
		"name":"Agency or User 3 File 1",
		"url":"https://www.SomeSite.com/Creds1",
		"pirlFileHash":"",
		"isActive":true,
		"userId":3,
		"userSubmissionId":0,
		"agencyId":0
	},
	{
		"name":"Agency or User 1 File 3",
		"url":"https://www.SomeSite.com/Creds1",
		"pirlFileHash":"",
		"isActive":true,
		"userId":1,
		"userSubmissionId":0,
		"agencyId":0
	},
]

var users = [
	{
		"firstName":"Patrick",
		"lastName":"Ewing",
		"email":"P.ewing@yahoo.com",
		"userId":1,
		"account":6
	},
	{
		"firstName":"John",
		"lastName":"Starks",
		"email":"J.Starks@yahoo.com",
		"userId":2,
		"account":7
	},
	{
		"firstName":"Latrelle",
		"lastName":"Sprewell",
		"email":"L.Spreewell@yahoo.com",
		"userId":3,
		"account":8
	}
]

	it("should create a contract, add 3 agencies, 6, files, retrieve files by agency, retrieve both.", function() {
		return Files.deployed().then(function(instance) {
			console.log("#########################  Getting Instance");
			_instance = Files.at(instance.address);
		 	return Promise.all([
		 		_instance.addFile(files[0].name, files[0].url, files[0].pirlFileHash,files[0].userId, files[0].agencyId,{from:accounts[users[0].account],gas: 19612388}),
		 		_instance.addFile(files[1].name, files[1].url, files[1].pirlFileHash,files[1].userId, files[1].agencyId,{from:accounts[users[0].account],gas: 19612388}),
		 		_instance.addFile(files[2].name, files[2].url, files[2].pirlFileHash,files[2].userId, files[2].agencyId,{from:accounts[users[1].account],gas: 19612388}),
		 		_instance.addFile(files[3].name, files[3].url, files[3].pirlFileHash,files[3].userId, files[3].agencyId,{from:accounts[users[1].account],gas: 19612388}),
		 		_instance.addFile(files[4].name, files[4].url, files[4].pirlFileHash,files[4].userId, files[4].agencyId,{from:accounts[users[2].account],gas: 19612388}),
		 		_instance.addFile(files[5].name, files[5].url, files[5].pirlFileHash,files[5].userId, files[5].agencyId,{from:accounts[users[1].account],gas: 19612388}),
		 	]);
		 }).then(function (results) {
		 	console.log('######### Log: 6 files created.  GasUsed = ' + results[1].receipt.gasUsed);
		 	return _instance.getFileListByUserId.call(files[0].userId);
		 }).then(function (results) {
		 	console.log('######### Log: Should have 3 files for user 1');
		 	for (var i = 0; i < results[0].length; i++) {
				 console.log(results[1][i].toNumber() + ' : ' + toAscii(results[0][i]));
				}
			assert.equal(toAscii(results[0][0]),files[0].name);
			assert.equal(toAscii(results[0][1]),files[1].name);
			assert.equal(toAscii(results[0][2]),files[5].name);
			return _instance.getFileListByUserId.call(files[2].userId);
		}).then(function (results) {
			console.log('######### Log: Should have 2 files for user 2');
			for (var i = 0; i < results[0].length; i++) {
				console.log(results[1][i].toNumber() + ' : ' + toAscii(results[0][i]));
			}
			assert.equal(toAscii(results[0][0]),files[2].name);
			assert.equal(toAscii(results[0][1]),files[3].name);
			return _instance.getFileById(5)
		 }).then(function (results) {
		 	console.log('######### Log: Should return User 1 File 3 : ' + toAscii(results[0]));
		 	assert.equal(toAscii(results[0]),files[5].name);
		});
	});
	
})