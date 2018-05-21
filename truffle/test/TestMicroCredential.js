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
		"firstName":"Mike",
		"lastName":"Murphy",
		"email":"mmurphy384@yahoo.com"
	}
	var _agency2 = {
		"name":"SomeOther Place",
		"website":"www.micro-credentials-r-us.io",
		"firstName":"Larry",
		"lastName":"Johnson",
		"email":"ljohnson@yahoo.com"
	}

	 it("should create a contract, add an agency and verify it was added, set it inactive", function() {
		 return MicroCredential.deployed().then(function(instance) {
			 _instance = MicroCredential.at(instance.address);
			 console.log('######### Log: Starting Tests for MicroCredential');
	 		return _instance.registerAgency(_agency.name, _agency.website, _agency.firstName, _agency.lastName, _agency.email, {from:accounts[1]});
		}).then(function (result) {
			//console.log('######### Log: receipt.gasUsed = ' + result.receipt.gasUsed);
			assert.isBelow(result.receipt.gasUsed,900000,'Gas did not exceed 900000');
			return _instance.getAgencyInfo.call(_agency.name);
		}).then(function (result) {
			console.log('######### Log: getAgencyInfo(' + _agency.name + ') = ' + toAscii(result[0]));
			assert.equal(toAscii(result[0]),_agency.name,"The agency name is correct");
			assert.equal(toAscii(result[1]),_agency.website,"The agency website is correct");
			assert.equal(toAscii(result[2]),_agency.firstName,"The agency firstName is correct");
			assert.equal(toAscii(result[3]),_agency.lastName,"The agency lastName is correct");
			assert.equal(toAscii(result[4]),_agency.email,"The agency email is correct");
			return _instance.getAgencyInfoByAddress.call(accounts[1]);
		}).then(function (result) {
			console.log('######### Log: getAgencyInfoByAddress(' + accounts[1] + ') = ' + toAscii(result[0]));
			assert.equal(toAscii(result[0]),_agency.name,"The agency name is correct");
			assert.equal(toAscii(result[1]),_agency.website,"The agency website is correct");
			assert.equal(toAscii(result[2]),_agency.firstName,"The agency firstName is correct");
			assert.equal(toAscii(result[3]),_agency.lastName,"The agency lastName is correct");
			assert.equal(toAscii(result[4]),_agency.email,"The agency email is correct");
			return _instance.updateAgencyInfo(_agency.name,'https://pirl.io', _agency.firstName, _agency.lastName, _agency.email,{from:accounts[1]});
		}).then(function (result) {
			//console.log('######### Log: receipt.gasUsed = ' + result.receipt.gasUsed);
			assert.isBelow(result.receipt.gasUsed,900000,'Gas did not exceed 900000');
			return _instance.getAgencyInfo.call(_agency.name);
		}).then(function (result) {
			console.log('######### Log: updated agency.website = ' + toAscii(result[1]));
			assert.equal(toAscii(result[1]),'https://pirl.io',"The agency website is correct");
			return _instance.setAgencyInactive({from:accounts[1]})
		}).then(function (result) {
			//console.log('######### Log: receipt.gasUsed = ' + result.receipt.gasUsed);
			assert.isBelow(result.receipt.gasUsed,900000,'Gas did not exceed 900000');
			return _instance.getAgencyInfo.call(_agency.name);
		}).then(function (result) {
			console.log('######### Log: agency[3] IsActive = ' + result[5]);
			assert.equal(result[5],false,"The agency name is inactive");
			return _instance.setAgencyActive({from:accounts[1]})
		}).then(function (result) {
			assert.isBelow(result.receipt.gasUsed,900000,'Gas did not exceed 900000');
			return _instance.getAgencyInfo.call(_agency.name);
		}).then(function (result) {
			console.log('######### Log: agency[3] IsActive = ' + result[5]);
			assert.equal(result[5],true,"The agency name is active again.  All is good in the world");
		});
	});
	
	it("should deposit coin, with draw some, then destroy the contract resulting in 0 balance", function() {
		var amountToSend = 10;
		var amountToWithDraw = 5;
		var balanceStart = 0;
		return MicroCredential.deployed().then(function(instance) {
			_instance = MicroCredential.at(instance.address);
			console.log('######### Log01: Starting Tests for MicroCredential');
			balanceStart = web3.fromWei(web3.eth.getBalance(accounts[9]),'ether').toNumber();
			return _instance.sendTransaction({from:accounts[9], value:amountToSend});
		}).then(function (result) {
			//console.log('######### Log02: SendTransaction receipt.gasUsed = ' + result.receipt.gasUsed);
			return _instance.getContractBalance();
		}).then(function (result) {
			console.log('######### Log03: getBalance after Send = ' + result.toNumber());
			var currentBalance = web3.fromWei(web3.eth.getBalance(accounts[9]),'ether').toNumber();
			assert.isBelow(1,(balanceStart-amountToSend),"The accounts[9] balance is correct");
			assert.equal(result.toNumber(),amountToSend,"The contract balance is correct");
			balanceStart = currentBalance;
			return _instance.withdraw(amountToWithDraw);
		}).then(function (result) {
			//console.log('######### Log04: SendTransaction receipt.gasUsed = ' + result.receipt.gasUsed);
			return _instance.getContractBalance();
		}).then(function (result) {
	 		console.log('######### Log05: getBalance after Withdrawal = ' + result.toNumber());
	 		var currentBalance = web3.fromWei(web3.eth.getBalance(accounts[9]),'ether').toNumber();
	 		assert.isBelow(1,(balanceStart+amountToWithDraw),"The accounts[9] balance is correct after the withdrawal");
	 		assert.equal(result.toNumber(),amountToSend-amountToWithDraw,"The contract balance is correct after withdrawal");
	 		return _instance.destroy();
		 }).then(function (result) {
		 	//console.log('######### Log06: SendTransaction receipt.gasUsed = ' + result.receipt.gasUsed);
		 	return _instance.getContractBalance();
		 }).then(function (result) {
		 	console.log('######### Log07: getBalance after Destroy = ' + result.toNumber());
	 		assert.equal(result.toNumber(),0,"The contract is inactive and all Pirl has been withdrawn");
		});
	});
})