pragma solidity ^0.4.19;

import "./ownable.sol";

contract MicroCredential is Ownable {

    // variables and such
    Agency private agency;

    struct Agency {
        bytes32 name;
        bytes32 website;
        bytes32 email;
        int perReviewFeeInPirl;
        bool isActive;
    }

    // Events
    event Deposit(address _from, uint value);


    // What would I do in a constructor?
    //


    // Purpose  : Fallback Function
    function() public payable {
        if (msg.value > 0)
            emit Deposit(msg.sender, msg.value);
    }

    // Purpose  : Set the agency basic info
    function setAgencyInfo(bytes32 _name, bytes32 _website, bytes32 _email, int _perReviewFeeInPirl) 
        public onlyOwner {
        agency.name = _name;
        agency.website = _website;
        agency.email = _email;
        agency.perReviewFeeInPirl = _perReviewFeeInPirl;
        agency.isActive = true;
    }

    function getAgencyInfo() view public returns (bytes32, bytes32, bytes32, int, bool) {
        return (agency.name, agency.website, agency.email, agency.perReviewFeeInPirl, agency.isActive);
    }

    // Purpose  : To Make the contract inactive
    // To Do    : In the future, this might do additional things
    //            such as return fees, clear statuses, etc.
    function setAgencyInactive() public onlyOwner {
        agency.isActive = false;
    }

    // Purpose  : Used when an agency becomes active again
    // To Do    : To be determined
    function setAgencyActive() public onlyOwner {
        agency.isActive = false;
    }

    // Purpose  : Get the contract balance
    function getContractBalance() public view onlyOwner returns (uint) {
        return address(this).balance;
    }

    // external functions

    // public functions

    // internal functions

    // private functions

}