pragma solidity ^0.4.19;

import "./Ownable.sol";
import "./Credentials.sol";

contract MicroCredential is Ownable,Credentials {

    // Events
    event Deposit(address _from, uint value);
    event Withdraw(address _to, uint _amount);
    event Balance(uint _remainingBalance);

    //  Make sure the address resolves a valid contract
    modifier onlyAgencyOwner() {
        uint id = agencyIdByAddress[msg.sender];
        require(agencies[id].agencyName.length > 1);
        _;
    }

    // variables and such
    struct Agency {
        bytes32 agencyName;
        bytes32 website;
        bytes32 email;
        bool isActive;
    }

    // Mappings and Variables
    Agency[] public agencies;
    mapping(bytes32 => uint) internal agencyIdByName;
    mapping(address => uint) internal agencyIdByAddress;

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

    // Purpose  : Set the agency basic info.  Can only by done by the agency owner 
    function updateAgencyInfo(bytes32 _agencyName, bytes32 _website, bytes32 _email) 
        public onlyAgencyOwner {
        require(_agencyName.length > 0);
        uint id = agencyIdByAddress[msg.sender];
        require(agencies[id].agencyName.length > 1);
        
        agencies[id].agencyName = _agencyName;
        agencies[id].website = _website;
        agencies[id].email = _email;
        agencies[id].isActive = true;
    }

    // Purpose  : Need an 'iniitalize' because the first time, because it's public and payable.
    //          : It needs to be payable or people will create these willy nilly.
    function registerAgency(string _agencyName, string _website, string _email) 
        public payable { 
        require(utfStringLength(_agencyName) > 0);
        require(agencyIdByName[stringToBytes32(_agencyName)] == 0);
        uint id = 0;
        id = agencies.push(Agency(stringToBytes32(_agencyName), stringToBytes32(_website),stringToBytes32(_email),true))-1;
        agencyIdByName[stringToBytes32(_agencyName)] = id;
        agencyIdByAddress[msg.sender] = id;
    }

    // Purpose  : Get the agency basic info
    function getAgencyInfo(string _agencyName) view public returns (bytes32, bytes32, bytes32, bool) {
        require(utfStringLength(_agencyName) > 0);
        uint id = agencyIdByName[stringToBytes32(_agencyName)];
        require(agencies[id].agencyName.length > 1);
        return (agencies[id].agencyName, agencies[id].website, agencies[id].email,agencies[id].isActive);
    }

    // Purpose  : To Make the contract inactive and return funds to owner
    function setAgencyInactive() public onlyAgencyOwner {
        uint id = agencyIdByAddress[msg.sender];
        require(agencies[id].agencyName.length > 1);
        agencies[id].isActive = false;
    }

    // Purpose  : Used when an agency becomes active again
    // To Do    : This will probably have to clear some queues, 
    //            reset credential statii, etc.
    function setAgencyActive() public onlyAgencyOwner {
        uint id = agencyIdByAddress[msg.sender];
        require(agencies[id].agencyName.length > 1);
        agencies[id].isActive = true;
    }

    // Purpose  : Get the contract balance
    function getContractBalance() public onlyOwner view returns (uint) {
        return address(this).balance;
    }

    // Purpsoe  : Owners with draw all pirl from contract.  Shutting contract down.
    function destroy() public onlyOwner {
        withdraw(address(this).balance);
    }

}