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
		"account":1
	},
	{
		"name":"SomeOther Place",
		"website":"www.micro-credentials-r-us.io",
		"firstName":"Larry",
		"lastName":"Johnson",
		"email":"ljohnson@yahoo.com",
		"account":2
	},
	{
		"name":"NYSUT Teachers Union",
		"website":"www.micro-credentials-r-us.io",
		"firstName":"Larry",
		"lastName":"Johnson",
		"email":"ljohnson@yahoo.com",
		"account":3
	}
];

var files = [
	{
		"id":1,
		"name":"Agency 1 File 1",
		"url":"https://www.acme.com/Creds1",
		"pirlFileHash":"",
		"isActive":true,
		"userId":0,
		"userSubmissionId":0,
		"agencyId":1
	},
	{
		"id":2,
		"name":"Agency 1 File 2",
		"url":"https://www.acme.com/Creds1",
		"pirlFileHash":"",
		"isActive":true,
		"userId":0,
		"userSubmissionId":0,
		"agencyId":1
	},
	{
		"id":3,
		"name":"Agency 2 File 1",
		"url":"https://www.acme.com/Creds1",
		"pirlFileHash":"",
		"isActive":true,
		"userId":0,
		"userSubmissionId":0,
		"agencyId":2
	},
	{
		"id":4,
		"name":"Agency 2 File 2",
		"url":"https://www.SomeSite.com/Creds1",
		"pirlFileHash":"",
		"isActive":true,
		"userId":0,
		"userSubmissionId":0,
		"agencyId":2
	},
	{
		"id":5,
		"name":"Agency 3 File 1",
		"url":"https://www.SomeSite.com/Creds1",
		"pirlFileHash":"",
		"isActive":true,
		"userId":0,
		"userSubmissionId":0,
		"agencyId":3
	},
	{
		"id":6,
		"name":"Agency 1 File 3",
		"url":"https://www.SomeSite.com/Creds1",
		"pirlFileHash":"",
		"isActive":true,
		"userId":0,
		"userSubmissionId":0,
		"agencyId":1
	},
]


	it("should create a contract, add 3 agencies, 6, files, retrieve files by agency, retrieve both.", function() {
		return Files.deployed().then(function(instance) {
			console.log("#########################  Getting Instance");
			_instance = Files.at(instance.address);
		 	return Promise.all([
		 		_instance.addFile(files[0].name, files[0].url, files[0].pirlFileHash,files[0].userId, files[0].agencyId,{from:accounts[agencies[0].account],gas: 19612388}),
		 		_instance.addFile(files[1].name, files[1].url, files[1].pirlFileHash,files[1].userId, files[1].agencyId,{from:accounts[agencies[0].account],gas: 19612388}),
		 		_instance.addFile(files[2].name, files[2].url, files[2].pirlFileHash,files[2].userId, files[2].agencyId,{from:accounts[agencies[0].account],gas: 19612388}),
		 		_instance.addFile(files[3].name, files[3].url, files[3].pirlFileHash,files[3].userId, files[3].agencyId,{from:accounts[agencies[0].account],gas: 19612388}),
		 		_instance.addFile(files[4].name, files[4].url, files[4].pirlFileHash,files[4].userId, files[4].agencyId,{from:accounts[agencies[0].account],gas: 19612388}),
		 		_instance.addFile(files[5].name, files[5].url, files[5].pirlFileHash,files[5].userId, files[5].agencyId,{from:accounts[agencies[0].account],gas: 19612388}),
		 	]);
		}).then(function (results) {
			console.log('######### Log: 6 files created.  GasUsed = ' + results[1].receipt.gasUsed);
			return _instance.getFileListByAgencyId.call(files[2].agencyId);
		}).then(function (results) {
			console.log('######### Log: Should have 2 files for agency 2');
			for (var i = 0; i < results[0].length; i++) {
				console.log(results[1][i].toNumber() + ' : ' + toAscii(results[0][i]));
			   }
		   assert.equal(toAscii(results[0][0]),files[2].name,'The file names match');
		   assert.equal(toAscii(results[0][1]),files[3].name,'The file names match');
		 	return _instance.getFileById.call(files[3].id);
		}).then(function (results) {
		 	console.log('######### Log: Should have 3 files for agency 1');
		 	console.log('######### Log: Name = ' + toAscii(results[0]));
		 	console.log('######### Log: url = ' + toAscii(results[1]));
		 	console.log('######### Log: pirlFileHash = ' + toAscii(results[2]));
		 	console.log('######### Log: isActive = ' + results[3]);
		 	console.log('######### Log: userId = ' + results[4].toNumber());
		 	console.log('######### Log: userSubmissionId = ' + results[5].toNumber());
		 	console.log('######### Log: agencyId = ' + results[6].toNumber());
			assert.equal(toAscii(results[0]),files[3].name);
			assert.equal(toAscii(results[1]),files[3].url);
			assert.equal(toAscii(results[2]),files[3].pirlFileHash);
			assert.equal(results[3],true, 'The file is active');
			assert.equal(results[4].toNumber(),files[3].userId);
			assert.equal(results[5].toNumber(),files[3].userSubmissionId);
			assert.equal(results[6].toNumber(),files[3].agencyId);
			return _instance.updateFileById(
					files[3].id,
					"Updated FileName", 
					files[3].url, 
					"New File Hash",
					true,
					files[3].userId, 
					12,
					files[3].agencyId,
					{from:accounts[agencies[0].account],gas: 19612388});
		}).then(function (result) {
				console.log('######### Log: 6 files created.  GasUsed = ' + result.receipt.gasUsed);
				return _instance.getFileById.call(files[3].id);
		}).then(function (results) {
			console.log('######### Log: Should have 3 files for agency 1');
			console.log('######### Log: Name = ' + toAscii(results[0]));
			console.log('######### Log: url = ' + toAscii(results[1]));
			console.log('######### Log: pirlFileHash = ' + toAscii(results[2]));
			console.log('######### Log: isActive = ' + results[3]);
			console.log('######### Log: userId = ' + results[4].toNumber());
			console.log('######### Log: userSubmissionId = ' + results[5].toNumber());
			console.log('######### Log: agencyId = ' + results[6].toNumber());
			assert.equal(toAscii(results[0]),"Updated FileName");
			assert.equal(toAscii(results[2]),"New File Hash");
			assert.equal(results[3],true, 'The file is active');
			assert.equal(results[5].toNumber(),12);
		});
	});
})