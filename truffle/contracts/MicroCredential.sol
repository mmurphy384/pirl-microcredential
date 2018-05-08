pragma solidity ^0.4.19;

import "./ownable.sol";

contract MicroCredential is Ownable {

    // variables and such
    bytes32 agencyName;
    bytes32 website;
    bytes32 email;
    int perReviewFeeInPirl;
    bool isActive;

    // Events
    event Deposit(address _from, uint value);
    event Withdraw(address _to, uint _amount);
    event Balance(uint _remainingBalance);
    // What would I do in a constructor.  
    // Still don't have a good purpose for this.


    // Purpose  : Fallback Function
    function() public payable {
        if (msg.value > 0) {
            emit Deposit(msg.sender, msg.value);
            emit Balance(address(this).balance);
        }
    }

    // Purpose  : For the owner to withdraw some funds.
    function withdraw(uint _amount) public onlyOwner {
        require(address(this).balance > 0);
        require(_amount > 0);
        require(address(this).balance >= _amount);
        address(msg.sender).transfer(_amount);
        emit Withdraw(msg.sender, _amount);
        emit Balance(address(this).balance);
    }

    // Purpose  : Set the agency basic info.  This is essentially the contract owner.  
    function setAgencyInfo(bytes32 _agencyName, bytes32 _website, bytes32 _email, int _perReviewFeeInPirl) 
        public onlyOwner {
        require(_agencyName.length > 0);
        require(_perReviewFeeInPirl > 0);
        agencyName = _agencyName;
        website = _website;
        email = _email;
        perReviewFeeInPirl = _perReviewFeeInPirl;
        isActive = true;
    }

    // Purpose  : Get the agency basic info
    function getAgencyInfo() view public returns (bytes32, bytes32, bytes32, int, bool) {
        return (agencyName, website, email, perReviewFeeInPirl, isActive);
    }

    // Purpose  : To Make the contract inactive and return funds to owner
    function setAgencyInactive() public onlyOwner {
        require(isActive);
        isActive = false;
        withdraw(address(this).balance);
    }

    // Purpose  : Used when an agency becomes active again
    // To Do    : This will probably have to clear some queues, 
    //            reset credential statii, etc.
    function setAgencyActive() public onlyOwner {
        isActive = false;
    }

    // Purpose  : Get the contract balance
    function getContractBalance() public view returns (uint) {
        return address(this).balance;
    }

    // internal functions

    // private functions

}