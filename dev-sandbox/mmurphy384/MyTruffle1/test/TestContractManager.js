var ContractManager = artifacts.require("./ContractManager.sol");

contract('ContractManager', function(accounts) {
	var micro;
	var account0 = "0x47ea1039993e27ce298246a7695dc6f7d6eeaacb";
	it("should create 1 new contract", function() {
		return ContractManager.deployed().then(function(instance) {
			micro = ContractManager.at(instance.address);
			return micro.newContract('ACME Testing Services1');
		}).then(function (result) {
			assert.isBelow(result.receipt.gasUsed,200000,'Gas did not exceed 200000');
			return micro.getContractCount.call();
		}).then(function (result) {
			assert.equal(result.toNumber(), 1, "The count of contracts should be 1");
		});
	});
})
