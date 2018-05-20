pragma solidity ^0.4.23;

import "./Ownable.sol";
import "./Users.sol";
import "./Credentials.sol";
import "./Files.sol";

contract MicroCredential is Ownable,Credentials,Users, Files {

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
        bytes32 firstName;
        bytes32 lastName;
        bytes32 email;
        bool isActive;
        bool exists;
    }

    // Mappings and Variables
    uint version = 1;
    Agency[] public agencies;
    mapping(bytes32 => uint) internal agencyIdByName;
    mapping(address => uint) internal agencyIdByAddress;
    uint numAgencies = 0;

    // What would I do in a constructor.  
    constructor() public {
        registerAgency("Root Agency","http://pirl.io","Mike","Murphy","mmurphy384@yahoo.com");
        addUser("root","user","mmurphy384@yahoo.com");
        addCredential("root credential", "http://pirl.io", 100,0);
        addFile("root file name", "http://pirl.io","",0,0);
    }

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

    // Purpose  : Need an 'iniitalize' because the first time, because it's public and payable.
    //          : It needs to be payable or people will create these willy nilly.
    function registerAgency(string _agencyName, string _website, string _firstName, string _lastName, string _email) 
        public payable { 
        require(utfStringLength(_agencyName) > 0);

        agencies.push(Agency(
            stringToBytes32(_agencyName), 
            stringToBytes32(_website),
            stringToBytes32(_firstName),
            stringToBytes32(_lastName),
            stringToBytes32(_email),
            true,
            true)
            );

        uint id = agencies.length-1;
        numAgencies += 1;
        agencyIdByName[stringToBytes32(_agencyName)] = id;
        agencyIdByAddress[msg.sender] = id;
    }

    // Purpose  : Set the agency basic info.  Can only by done by the agency owner 
    function updateAgencyInfo(string _agencyName, string _website, string _firstName, string _lastName, string _email) 
        public onlyAgencyOwner {
        require(utfStringLength(_agencyName) > 2);
        uint id = agencyIdByAddress[msg.sender];
        require(agencies[id].agencyName.length > 1);
        agencies[id].agencyName = stringToBytes32(_agencyName);
        agencies[id].website = stringToBytes32(_website);
        agencies[id].firstName = stringToBytes32(_firstName);
        agencies[id].lastName = stringToBytes32(_lastName);
        agencies[id].email = stringToBytes32(_email);
        agencies[id].isActive = true;
    }

    // Purpose  : Get the agency basic info
    function getAgencyCount() view public returns (uint) {
        return numAgencies;
    }

    // Purpose  : Get the agency basic info
    function getAgencyInfo(string _agencyName) view public returns (bytes32, bytes32, bytes32, bytes32, bytes32, bool, uint) {
        require(utfStringLength(_agencyName) > 0);
        uint id = agencyIdByName[stringToBytes32(_agencyName)];
        return getAgencyInfoById(id);
    }

    // Purpose  : Get the agency basic info
    // function getAgencyInfoByAddress(address _address) view public returns (bytes32, bytes32, bytes32, bytes32, bytes32, bool, uint) {
    //     uint id = agencyIdByAddress[_address];
    //     return getAgencyInfoById(id);
    // }

    // Purpose  : Get the agency basic info
    function getAgencyInfoById(uint _id) view public returns (bytes32, bytes32, bytes32, bytes32, bytes32, bool, uint) {
        require(agencies[_id].agencyName.length > 1);
        return (
            agencies[_id].agencyName, 
            agencies[_id].website, 
            agencies[_id].firstName, 
            agencies[_id].lastName, 
            agencies[_id].email, 
            agencies[_id].isActive,
            _id);
    }

    // Purpose  : Get the agency basic info
    // function getAgencyIdByAddress(address _address) view public returns (uint) {
    //     return agencyIdByAddress[_address];
    // }

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

    // Purpose  : Determines if the address is an agency
    function addressIsAgency(address _address) public view returns (bool) {
        uint id = agencyIdByAddress[_address];
        return (id > 0);
    }

    function getAgencies() public view returns (bytes32[], uint[]) {
        require(agencies.length >= 0);
        bytes32[] memory  agencyNames = new bytes32[](numAgencies);
        uint[] memory  ids = new uint[](numAgencies);
        for (uint i = 0; i < numAgencies; i++) {
            agencyNames[i] = agencies[i].agencyName;
            ids[i] = agencyIdByName[agencies[i].agencyName];
        }
        return (agencyNames, ids);
    }

    // Purpsoe  : Owners with draw all pirl from contract.  Shutting contract down.
    function destroy() public onlyOwner {
        withdraw(address(this).balance);
    }

}