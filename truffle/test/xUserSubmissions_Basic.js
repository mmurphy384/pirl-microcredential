var UserSubmissions = artifacts.require("./UserSubmissions.sol");

contract('UserSubmissions', function(accounts) {
	
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
	var userSubmissions = [
		{
			"submissionId":1,
			"userId":1,
			"agencyId":1,
			"credentialId":1,
			"fileIds":"1,2",
			"status":"submitted0111",
			"account":6
		},
		{
			"submissionId":2,
			"userId":1,
			"agencyId":1,
			"credentialId":2,
			"fileIds":"9,10",
			"status":"submitted1112",
			"account":6
		},
		{
			"submissionId":3,
			"userId":2,
			"agencyId":1,
			"credentialId":1,
			"fileIds":"11,12",
			"status":"submitted2211",
			"account":7
		},
		{
			"submissionId":4,
			"userId":2,
			"agencyId":1,
			"credentialId":2,
			"fileIds":"",
			"status":"submitted3212",
			"account":7
		},
		{
			"submissionId":5,
			"userId":1,
			"agencyId":2,
			"credentialId":1,
			"fileIds":"12,14",
			"status":"submitted4121",
			"account":6
		},
		{
			"submissionId":6,
			"userId":1,
			"agencyId":2,
			"credentialId":2,
			"fileIds":"15,16",
			"status":"submitted5122",
			"account":6
		},
		{
			"submissionId":7,
			"userId":2,
			"agencyId":2,
			"credentialId":2,
			"fileIds":"17",
			"status":"submitted6222",
			"account":7
		},
		{
			"submissionId":8,
			"userId":1,
			"agencyId":1,
			"credentialId":1,
			"fileIds":"17",
			"status":"submitted7111",
			"account":6
		},
		{
			"submissionId":9,
			"userId":1,
			"agencyId":2,
			"credentialId":2,
			"fileIds":"17",
			"status":"approved8122",
			"account":6
		},
	]


	it("should create the UserSubmissions contract, add 9 entries and retrieve some items.", function() {
		return UserSubmissions.deployed().then(function(instance) {
			console.log("#########################  Getting UserSubmissions Instance");
			_instance = UserSubmissions.at(instance.address);
		 	return Promise.all([
				_instance.addSubmission(userSubmissions[0].userId, userSubmissions[0].agencyId, userSubmissions[0].credentialId,userSubmissions[0].fileIds, userSubmissions[0].status,{from:accounts[userSubmissions[0].account],gas: 19612388}),
				_instance.addSubmission(userSubmissions[1].userId, userSubmissions[1].agencyId, userSubmissions[1].credentialId,userSubmissions[1].fileIds, userSubmissions[1].status,{from:accounts[userSubmissions[1].account],gas: 19612388}),
		 		_instance.addSubmission(userSubmissions[2].userId, userSubmissions[2].agencyId, userSubmissions[2].credentialId,userSubmissions[2].fileIds, userSubmissions[2].status,{from:accounts[userSubmissions[2].account],gas: 19612388}),
		 		_instance.addSubmission(userSubmissions[3].userId, userSubmissions[3].agencyId, userSubmissions[3].credentialId,userSubmissions[3].fileIds, userSubmissions[3].status,{from:accounts[userSubmissions[3].account],gas: 19612388}),
		 		_instance.addSubmission(userSubmissions[4].userId, userSubmissions[4].agencyId, userSubmissions[4].credentialId,userSubmissions[4].fileIds, userSubmissions[4].status,{from:accounts[userSubmissions[4].account],gas: 19612388}),
		 		_instance.addSubmission(userSubmissions[5].userId, userSubmissions[5].agencyId, userSubmissions[5].credentialId,userSubmissions[5].fileIds, userSubmissions[5].status,{from:accounts[userSubmissions[5].account],gas: 19612388}),
		 		_instance.addSubmission(userSubmissions[6].userId, userSubmissions[6].agencyId, userSubmissions[6].credentialId,userSubmissions[6].fileIds, userSubmissions[6].status,{from:accounts[userSubmissions[6].account],gas: 19612388}),
		 		_instance.addSubmission(userSubmissions[7].userId, userSubmissions[7].agencyId, userSubmissions[7].credentialId,userSubmissions[7].fileIds, userSubmissions[7].status,{from:accounts[userSubmissions[7].account],gas: 19612388}),
		 		_instance.addSubmission(userSubmissions[8].userId, userSubmissions[8].agencyId, userSubmissions[8].credentialId,userSubmissions[8].fileIds, userSubmissions[8].status,{from:accounts[userSubmissions[8].account],gas: 19612388}),
		 	]);
		 }).then(function (results) {
		 	console.log('######### Log: 9 user submissions created.  GasUsed = ' + results[1].receipt.gasUsed);
		 	return Promise.all([
				 _instance.getSubmissionById.call(userSubmissions[4].submissionId)
			 ]);
		}).then(function (results) {
			console.log('######### Log: UserSubmissionId=4 should have user1, agency2, cred1, files12,14,submitted4212');
			console.log('######### Log: user = ' + results[0][0].toNumber());
			console.log('######### Log: agency = ' + results[0][1].toNumber());
			console.log('######### Log: credential = ' + results[0][2].toNumber());
			console.log('######### Log: fileIds = ' + toAscii(results[0][3]));
			console.log('######### Log: statis = ' + toAscii(results[0][4]));
			assert.equal(results[0][0].toNumber(),userSubmissions[4].userId);
			assert.equal(results[0][1].toNumber(),userSubmissions[4].agencyId);
			assert.equal(results[0][2].toNumber(),userSubmissions[4].credentialId);
			assert.equal(toAscii(results[0][3]),userSubmissions[4].fileIds);
			assert.equal(toAscii(results[0][4]),userSubmissions[4].status);
			return _instance.getSubmissionListByAgencyId.call(2);
		}).then(function (results) {
			console.log('######### Log: Files for agency 2 include 4121,5122,6222,8122  Should see 4');
			for (var i =0; i < results[0].length; i++){
				console.log('######### Log: UserSubmissionIds = ' + results[1][i].toNumber() + ' and Status=' + toAscii(results[0][i]));
			}
			assert.equal(results[1][3].toNumber(),userSubmissions[8].submissionId,'UserSubmissionId for last one is accurate')
			assert.equal(toAscii(results[0][3]),userSubmissions[8].status,' status for last one is accurate')
			return _instance.getSubmissionListByUserId.call(2);
		}).then(function (results) {
			console.log('######### Log: Files for John Starks include 2211,3212,6222.  Should see 3');
			for (var i =0; i < results[0].length; i++){
				console.log('######### Log: UserSubmissionIds = ' + results[1][i].toNumber() + ' and Status=' + toAscii(results[0][i]));
			}
			assert.equal(results[1][2].toNumber(),userSubmissions[6].submissionId,'User Submission Id is accurate')
			assert.equal(toAscii(results[0][2]),userSubmissions[6].status,' status is accurate')
			return Promise.all([
				_instance.updateStatus(1,'in-progress',{from:accounts[userSubmissions[0].account]}),
				_instance.updateStatus(3,'in-progress',{from:accounts[userSubmissions[2].account]})
			]); 
		}).then(function (results) {
			console.log('######### Log: 6 Updated Status.  GasUsed = ' + results[1].receipt.gasUsed);
			return Promise.all([
				_instance.getSubmissionById.call(userSubmissions[0].submissionId),
				_instance.getSubmissionById.call(userSubmissions[2].submissionId)
			]);
		}).then(function (results) {
			console.log('######### Log: status = ' + toAscii(results[0][4]));
			assert.equal(toAscii(results[0][4]),'in-progress', 'The statsus of UserSubmission 1 is now set to in-progress');
			assert.equal(toAscii(results[1][4]),'in-progress', 'The statsus of UserSubmission 3 is now set to in-progress');
		});
	});
	
})