pragma solidity ^0.4.19;

import "./ownable.sol";

contract MicroCredential is Ownable {

    Agency private agency;

    struct Agency {
        bytes32 name;
        bytes32 website;
        bytes32 email;
        int perReviewFeeInPirl;
        bool isActive;
    }


    // What would I do in a constructor?
    


    // Sets the contract owners contact info
    function SetAgencyInfo(bytes32 _name, bytes32 _website, bytes32 _email, int _perReviewFeeInPirl) public onlyOwner {
        agency.name = _name;
        agency.website = _website;
        agency.email = _email;
        agency.perReviewFeeInPirl = _perReviewFeeInPirl;
        agency.isActive = true;
    }

    // We might do more stuff when an agency goes inactive (return fees, etc)
    function SetAgencyInactive() public onlyOwner {
        agency.isActive = false;
    }

    // We might do more stuff when an agency becomes active again
    function SetAgencyActive() public onlyOwner {
        agency.isActive = false;
    }

    function GetAgencyInfo() view public returns (bytes32, bytes32, bytes32, int, bool) {
        return (agency.name, agency.website, agency.email, agency.perReviewFeeInPirl, agency.isActive);
    }



}