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
		"name":"Acme MicroCredentials",
		"website":"www.micro-credentials-r-us.io",
		"email":"mmurphy384@yahoo.com",
		"perReviewFeeInPirl":25
	}

	it("should create a contract and verify that the owner is set properly", function() {
		return MicroCredential.deployed().then(function(instance) {
			_instance = MicroCredential.at(instance.address);
			return _instance.SetAgencyInfo(_agency.name, _agency.website, _agency.email, _agency.perReviewFeeInPirl);
		}).then(function (result) {
			console.log('######### Log: txReceipt = ' + result);
			assert.isBelow(result.receipt.gasUsed,900000,'Gas did not exceed 900000');
			return _instance.GetAgencyInfo.call();
		}).then(function (result) {
			console.log('######### Log: agency[0] = ' + toAscii(result[0]));
			assert.equal(toAscii(result[0]),_agency.name,"The agency name is correct");
			assert.equal(toAscii(result[1]),_agency.website,"The agency website is correct");
			assert.equal(toAscii(result[2]),_agency.email,"The agency email is correct");
			assert.equal(result[3].toNumber(),_agency.perReviewFeeInPirl,"The agency perReviewFeeInPirl is correct");
		});
	});

})