var ContractManager = artifacts.require("./ContractManager.sol");

contract('ContractManager', function(accounts) {
    it("should exercise a dummy function that returns 99", function() {
        return ContractManager.deployed().then(function(instance) {
          return instance.testShouldReturn99.call();
        }).then(function(result) {
          assert.equal(result.valueOf(), 99, "99 didn't equal 99");
        });
      });
  });
