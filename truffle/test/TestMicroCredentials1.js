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
	var agencies = [{
			"name":"Acme MicroCredentials",
			"website":"www.micro-credentials-r-us.io",
			"firstName":"Mike",
			"lastName":"Murphy",
			"email":"mmurphy384@yahoo.com"
		},
		{
			"name":"SomeOther Place",
			"website":"www.micro-credentials-r-us.io",
			"firstName":"Larry",
			"lastName":"Johnson",
			"email":"ljohnson@yahoo.com"
		},
		{
			"name":"NYSUT Teachers Union",
			"website":"www.micro-credentials-r-us.io",
			"firstName":"Larry",
			"lastName":"Johnson",
			"email":"ljohnson@yahoo.com"
		}
	];

	it("should create multiple agencies and see if the agency exists", function() {
		return MicroCredential.deployed().then(function(instance) {
			_instance = MicroCredential.at(instance.address);
			console.log('######### Log: Starting Tests for MicroCredential1');
			return _instance.getAgencyCount.call();
		}).then(function (result) {
			console.log('######### Log: Original Agency Count = ' + result.toNumber());
			return Promise.all([
				_instance.registerAgency(agencies[0].name, agencies[0].website, agencies[0].firstName, agencies[0].lastName, agencies[0].email, {from:accounts[1]}),
				_instance.registerAgency(agencies[1].name, agencies[1].website, agencies[1].firstName, agencies[1].lastName, agencies[1].email, {from:accounts[2]}),
				_instance.registerAgency(agencies[2].name, agencies[2].website, agencies[2].firstName, agencies[2].lastName, agencies[2].email, {from:accounts[3]})
			]);
		}).then(function (results) {
			return _instance.getAgencyCount.call();
		}).then(function (result) {
			console.log('######### Cound after adding 3 = ' + result.toNumber());
			return Promise.all([
				_instance.getAgencyInfoByAddress.call(accounts[0]),
				_instance.getAgencyInfoByAddress.call(accounts[1]),
				_instance.getAgencyInfoByAddress.call(accounts[2]),
				_instance.getAgencyInfoByAddress.call(accounts[3])
			]);
		}).then(function (results) {
			for (var i = 0; i < results.length; i++ ) {
				console.log('######### getAgencyInfoByAddress agency' + (i + 1) + ' = ' + toAscii(results[i][0]));
			}
			return Promise.all([
				_instance.getAgencyInfoById.call(0),
				_instance.getAgencyInfoById.call(1),
				_instance.getAgencyInfoById.call(2),
				_instance.getAgencyInfoById.call(3)
			]);
		}).then(function (results) {
			for (var i = 0; i < results.length; i++ ) {
				console.log('######### getAgencyInfoById agency' + (i + 1) + ' = ' + toAscii(results[i][0]));
			}
			return _instance.getAgencyCount.call();
		}).then(function (result) {
			console.log('######### List should have this many = ' + result.toNumber());
			return _instance.getAgencies.call();
		}).then(function (results) {
			console.log('######### Log: Num Agencies = ' + results[0].length);
			for (var i = 0; i < results[0].length; i++) {
				console.log('######### Log Agencies: getAgency' + i.toString() + '[agencyName] = ' + toAscii(results[0][i]));
				console.log('######### Log Agencies: getAgency' + i.toString() + '[agencyId] = ' + results[1][i].toNumber());
			}
			return Promise.all ([
				_instance.addressIsAgency(accounts[0]),
				_instance.addressIsAgency(accounts[1]),
				_instance.addressIsAgency(accounts[2]),
				_instance.addressIsAgency(accounts[3]),
				_instance.addressIsAgency(accounts[4]),
				_instance.addressIsAgency(accounts[5]),
				_instance.addressIsAgency(accounts[6]),
				_instance.addressIsAgency(accounts[7])
			]);
		}).then(function (results) {
			for (var i = 0; i < results.length; i++) {
				console.log('######### Log Agencies: accounts[' + i.toString() + '] is Agency = ' + results[i]);
			}
		});
	});
})