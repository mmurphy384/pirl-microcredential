pragma solidity ^0.4.19;

import "./myutils.sol";

contract Credentials is MyUtils {

    // Events
    event NewCredential(bytes32 name, bytes32 url,  bytes32 isActive, uint fee);

    // Structs
    struct Credential {
        bytes32 name;
        bytes32 url;
        bool isActive;
        uint fee;
    }

    Credential[] public credentials;
    mapping(bytes32 => uint) internal credentialIdByName;

    // Purpose  : To hold add a credential to the list of available credentials
    function addCredential(string _name, string _url, uint _fee) public returns (uint) {
        require(credentialIdByName[stringToBytes32(_name)] == 0);
        uint id = 0;
        id = credentials.push(Credential(stringToBytes32(_name), stringToBytes32(_url),true,_fee))-1;
        credentialIdByName[stringToBytes32(_name)] = id;
        return id;
    }

    // Purpose  : To retrieve a credential by the id
    function getCredentialById(uint _id) public view returns (bytes32 name, bytes32 url, uint fee) {
        require(_id < credentials.length);
        return (credentials[_id].name, credentials[_id].url, credentials[_id].fee); 
    }

    function getCredentialByName(string _name) public view returns (bytes32 name, bytes32 url, uint fee) {
        uint _id = credentialIdByName[stringToBytes32(_name)];
        require(credentials[_id].name.length > 0);
        require(_id < credentials.length);
        return (credentials[_id].name, credentials[_id].url, credentials[_id].fee); 
    }

    function getCredentialList() public view returns (bytes32[]) {
        require(credentials.length >= 0);
        bytes32[] memory  names = new bytes32[](credentials.length);
        for (uint i = 0; i <= credentials.length-1; i++) {
            names[i] = credentials[i].name;
        }
        return (names);
    }

    function stringToBytes32(string memory source) internal pure returns (bytes32 result) {
        bytes memory tempEmptyStringTest = bytes(source);
        if (tempEmptyStringTest.length == 0) {
            return 0x0;
        }
        assembly {result := mload(add(source, 32))}
    }

}