pragma solidity ^0.4.19;

import "./myutils.sol";

contract Users is MyUtils {

    // Events
    event NewUser(bytes32 name, bytes32 url,  bytes32 isActive, uint fee);


    //  Make sure the address resolves a valid contract
    modifier onlyUserOwner() {
        uint id = userIdByAddress[msg.sender];
        require(users[id].firstName.length > 1);
        _;
    }

    // Structs
    struct User {
        bytes32 firstName;
        bytes32 lastName;
        bytes32 email;
        bool isActive;
    }

    User[] public users;
    mapping(bytes32 => uint) internal userIdByEmail;
    mapping(address => uint) internal userIdByAddress;

    // Purpose  : User adds their own account
    function addUser(string _firstName, string _lastName, string _email) public {
        require(userIdByEmail[stringToBytes32(_email)] == 0);
        require(userIdByAddress[msg.sender] == 0);
        //require(_email.length > 4);
        uint id = 0;
        id = users.push(User(stringToBytes32(_firstName), stringToBytes32(_lastName),stringToBytes32(_email), true))-1;
        userIdByEmail[stringToBytes32(_email)] = id;
        userIdByAddress[msg.sender] = id;
    }

    // Purpose  : To update user about a person
    function updateUser(string _firstName, string _lastName, string _email) onlyUserOwner public {
        require(userIdByAddress[msg.sender] > 0);
        //require(_email.length > 4);
        uint id = getIdByAddress(msg.sender);
        users[id].firstName = stringToBytes32(_firstName);
        users[id].lastName = stringToBytes32(_lastName);
        users[id].email = stringToBytes32(_email);
        userIdByEmail[stringToBytes32(_email)] = id;
    }

    // Purpose  : To retrieve a users id via email
    function getIdByEmail(string _email) public view returns (uint) {
        //require(_email.length > 0);
        //require(userIdByEmail[stringToBytes32(_email)] > 0);
        return userIdByEmail[stringToBytes32(_email)];
    }

    // Purpose  : To retrieve a users id via email
    function getIdByAddress(address _address) public view returns (uint) {
        require(userIdByAddress[_address] > 0);
        return userIdByAddress[_address];
    }

    // Purpose  : To retrieve a users id via email
    function getMyId() public view returns (uint) {
        require(userIdByAddress[msg.sender] > 0);
        return userIdByAddress[msg.sender];
    }

    // Purpose  : To retrieve a credential by the id
    function getUserById(uint _id) public view returns (bytes32, bytes32, bytes32, bool, uint) {
        require(_id < users.length);
        return (users[_id].firstName, users[_id].lastName, users[_id].email, users[_id].isActive, _id); 
    }

    function getUserByEmail(string _email) public view returns  (bytes32, bytes32, bytes32, bool, uint) {
        uint _id = userIdByEmail[stringToBytes32(_email)];
        require(users[_id].email.length > 0);
        require(_id < users.length);
        return (users[_id].firstName, users[_id].lastName, users[_id].email, users[_id].isActive, _id); 
    }

    function getUserByAddress(address _address) public view returns (bytes32, bytes32, bytes32, bool, uint) {
        uint _id = userIdByAddress[_address];
        require(users[_id].email.length > 0);
        require(_id < users.length);
        return (users[_id].firstName, users[_id].lastName, users[_id].email, users[_id].isActive, _id); 
    }

    function getUserList() public view returns (bytes32[], bytes32[], bytes32[], bool[]) {
        require(users.length >= 0);
        bytes32[] memory firstNames = new bytes32[](users.length);
        bytes32[] memory lastNames = new bytes32[](users.length);
        bytes32[] memory emails = new bytes32[](users.length);
        bool[] memory isActives = new bool[](users.length);
        for (uint i = 0; i <= users.length-1; i++) {
            firstNames[i] = users[i].firstName;
            lastNames[i] = users[i].lastName;
            emails[i] = users[i].email;
            isActives[i] = users[i].isActive;
        }
        return (firstNames, lastNames, emails, isActives);
    }

    // To Do:  Probably need backdoor onlyOwner functions to update a users address,etc.

    function stringToBytes32(string memory source) internal pure returns (bytes32 result) {
        bytes memory tempEmptyStringTest = bytes(source);
        if (tempEmptyStringTest.length == 0) {
            return 0x0;
        }
        assembly {result := mload(add(source, 32))}
    }

}