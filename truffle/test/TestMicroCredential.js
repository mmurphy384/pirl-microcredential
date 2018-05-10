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
			return _instance.setAgencyInfo(_agency.name, _agency.website, _agency.email, _agency.perReviewFeeInPirl);
		}).then(function (result) {
			console.log('######### Log: receipt.gasUsed = ' + result.receipt.gasUsed);
			assert.isBelow(result.receipt.gasUsed,900000,'Gas did not exceed 900000');
			return _instance.getAgencyInfo.call();
		}).then(function (result) {
			console.log('######### Log: agency[0] = ' + toAscii(result[0]));
			assert.equal(toAscii(result[0]),_agency.name,"The agency name is correct");
			assert.equal(toAscii(result[1]),_agency.website,"The agency website is correct");
			assert.equal(toAscii(result[2]),_agency.email,"The agency email is correct");
			assert.equal(result[3].toNumber(),_agency.perReviewFeeInPirl,"The agency perReviewFeeInPirl is correct");
		});
	});
	
	it("should send a small amount of Pirl to the contract and verify that it was received", function() {
		var amountToSend = 10;
		var amountToWithDraw = 5;
		var balanceStart = 0;
		return MicroCredential.deployed().then(function(instance) {
			_instance = MicroCredential.at(instance.address);
			return _instance.getContractBalance();
		}).then(function (result) {
			console.log('######### Log: getBalance = ' + result.toNumber());
			balanceStart = web3.fromWei(web3.eth.getBalance(accounts[9]),'ether').toNumber();
			return _instance.sendTransaction({from:accounts[9], value:amountToSend});
		}).then(function (result) {
			console.log('######### Log: SendTransaction receipt.gasUsed = ' + result.receipt.gasUsed);
			return _instance.getContractBalance();
		}).then(function (result) {
			console.log('######### Log: getBalance after Send = ' + result.toNumber());
			var currentBalance = web3.fromWei(web3.eth.getBalance(accounts[9]),'ether').toNumber();
			assert.isBelow(1,(balanceStart-amountToSend),"The accounts[9] balance is correct");
			assert.equal(result.toNumber(),amountToSend,"The contract balance is correct");
			balanceStart = currentBalance;
			return _instance.withdraw(amountToWithDraw);
		}).then(function (result) {
			console.log('######### Log: SendTransaction receipt.gasUsed = ' + result.receipt.gasUsed);
			return _instance.getContractBalance();			
		}).then(function (result) {
			console.log('######### Log: getBalance after Withdrawal = ' + result.toNumber());
			var currentBalance = web3.fromWei(web3.eth.getBalance(accounts[9]),'ether').toNumber();
			assert.isBelow(1,(balanceStart+amountToWithDraw),"The accounts[9] balance is correct after the withdrawal");
			assert.equal(result.toNumber(),amountToSend-amountToWithDraw,"The contract balance is correct after withdrawal");
			return _instance.setAgencyInactive();
		}).then(function (result) {
			console.log('######### Log: SendTransaction receipt.gasUsed = ' + result.receipt.gasUsed);
			return _instance.getContractBalance();			
		}).then(function (result) {
			console.log('######### Log: getBalance after Inactive = ' + result.toNumber());
			assert.equal(result.toNumber(),0,"The contract is inactive and all Pirl has been withdrawn");
		});
	});

})