var ContractManager = artifacts.require("./ContractManager.sol");

contract('ContractManager', function(accounts) {

	it("should create 1 new contract", function() {
		return ContractManager.deployed().then(function(instance) {
			return Promise.all([
				instance.newContract.call('ACME Testing Services1'),
				instance.getContractCount.call()
			]);
		}).then(function (results) {
			console.log('############### Log Entry: Contract Addres = ' + results[0].valueOf());
			console.log('############### Log Entry: Num Contracts= ' + results[1].valueOf());
			assert.equal(results[0].valueOf().length, 42, "The contract address is valid");
			assert.equal(results[1].toNumber(), 1, "The count of contracts should be 1");
		});
	});
})
