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


    // What would I do in a constructor.  I still don't
    // have a good purpose for this (yet)


    // Purpose  : Fallback Function
    function() public payable {
        if (msg.value > 0)
            emit Deposit(msg.sender, msg.value);
    }

    // Purpose  : Set the agency basic info.  This is essentially the contract owner.  This info
    //            will be displayed on whatever page we show to consumers.
    function setAgencyInfo(bytes32 _agencyName, bytes32 _website, bytes32 _email, int _perReviewFeeInPirl) 
        public onlyOwner {
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

    // Purpose  : To Make the contract inactive
    // To Do    : In the future, this might do additional things
    //            such as return fees, clear statuses, etc.
    function setAgencyInactive() public onlyOwner {
        isActive = false;
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