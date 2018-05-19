pragma solidity ^0.4.19;


contract Credentials {

    // Events
    event NewCredential(bytes32 name, bytes32 url,  bytes32 isActive, uint fee);

    // Structs
    struct Credential {
        bytes32 name;
        bytes32 url;
        bool isActive;
        uint fee;
        uint agencyId;
    }

    Credential[] public credentials;
    mapping(bytes32 => uint) internal credentialIdByName;
    mapping(uint => uint) internal credentialCountByAgencyId;

    // Purpose  : To hold add a credential to the list of available credentials
    function addCredential(string _name, string _url, uint _fee, uint _agencyId) public {
        require(credentialIdByName[stringToBytes32(_name)] == 0);
        uint id = 0;
        id = credentials.push(Credential(stringToBytes32(_name), stringToBytes32(_url),true,_fee, _agencyId))-1;
        credentialIdByName[stringToBytes32(_name)] = id;
        credentialCountByAgencyId[_agencyId] = credentialCountByAgencyId[_agencyId] += 1;
    }

    // Purpose  : To retrieve a credential by the id
    function getCredentialById(uint _id) public view returns (bytes32 name, bytes32 url, uint fee) {
        require(_id < credentials.length);
        return (credentials[_id].name, credentials[_id].url, credentials[_id].fee); 
    }

    function getCredentialListByAgencyId(uint _agencyId) public view returns (bytes32[], uint[]) {
        bytes32[] memory  names = new bytes32[](credentialCountByAgencyId[_agencyId]);
        uint[] memory  ids = new uint[](credentialCountByAgencyId[_agencyId]);
        uint index = 0;
        for (uint i = 0; i <= credentials.length-1; i++) {
            if (credentials[i].agencyId == _agencyId) {
                names[index] = credentials[i].name;
                ids[index] = i;
                index += 1;
            }
        }
        return (names,ids);
    }

    function stringToBytes32(string memory source) internal pure returns (bytes32 result) {
        bytes memory tempEmptyStringTest = bytes(source);
        if (tempEmptyStringTest.length == 0) {
            return 0x0;
        }
        assembly {result := mload(add(source, 32))}
    }

}