pragma solidity ^0.4.19;


contract MicroCredential  {

    string nameOfAgency;
    string agencyDescription;
    string addressOfAgency;
    string websiteOfAgency;
    string emailOfAgency;
    address owner;
    address creator;

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    //the type of credential, that the agency can define
    struct Credential {
        string name;
        string code;
        string requirements;
        bool active;
    }

    //application for approving a credential, from an application and then approved by agency
    struct CredentialApplication {
        bytes32 requirements;
        bytes32 name;
        uint typeOfCredential;
        bool received;
        bool approved;
        uint blockApproved;
        uint timeApproved;
    }

    Credential[] credentialList;
    CredentialApplication[] credentials;

    event CredentialSubmitted(address sender, uint credentialNumber);
    event CredentialReceived(address sender, uint credentialNumber);

    function MicroCredential(address _owner) public {
        owner = _owner;
        creator = msg.sender;
    }

    function getOwner() constant public returns (address){
        return owner;
    }

    function getCreator() constant public returns (address){
        return creator;
    }

    //submit a micro credential for approval by agency
    function submitMicroCredential(uint cred) public returns (bool){
        require(cred<credentialList.length);
        require(credentialList[cred].active == true);
        //submitting a credential should include some documentation/photos, right?
        //this could be a great usecase for the Pirl masternode system, namely the masternodes 
        //will store the files for a period of time, at least until the agency has fetched the data themselves
        //after the data has been fetched from the (storage) masternodes, the owner should perhaps call a function
        //called "credentialReceived", acknowledging that the credential application has been seen, data has been received
        //and the process for approval is submitted

        emit CredentialSubmitted(msg.sender,credentials.length-1);
    }

    //the agency creates a type of credential
    function createCredential(string name, string code, string requirements) public onlyOwner returns (bool){
        Credential memory cred = Credential(name,code,requirements,true);
        credentialList.push(cred);
        return true;
    }

    function getCredentialCount() public view returns (uint) {
        return credentialList.length;
    }

    function getCredential(uint _index) public view returns (string name, string code, string requirements) {
        require(_index<credentialList.length);
        return (credentialList[_index].name, credentialList[_index].code, credentialList[_index].requirements); 
    }

    function getCredentialList() public constant returns (bytes32[]) {
        require(credentialList.length >= 0);
        bytes32[] memory  names = new bytes32[](credentialList.length);
        for (uint i = 0; i <= credentialList.length-1; i++) {
            names[i] = stringToBytes32(credentialList[i].name);
        }
        return (names);
    }

    //option to disable a credential
    function disableCredential(uint cred) public onlyOwner returns (bool){
        require(cred<credentialList.length);
        credentialList[cred].active = false;
    }

    //option to enable a credential
    function enableCredential(uint cred) public onlyOwner returns (bool){
        require(cred<credentialList.length);
        credentialList[cred].active = true;
    }

    //should be called by the agency when they have received the credential
    //this function could be necessary if the supporting files are stored on storage masternodes
    //the agency then calls this function when they have downloaded the files
    function credentialReceived(uint _index) public constant onlyOwner returns (bool){
        // TO DO:  Write it
        return (1==1);
    }


    //function to approve a submitted credential
    function approveCredential(uint index) public onlyOwner returns (bool) {
        require(index<credentials.length);
        require(!credentials[index].approved);
        credentials[index].approved = true;
        credentials[index].blockApproved = block.number;
        credentials[index].timeApproved = block.timestamp;
        return true;
    }

    function stringToBytes32(string memory source) internal pure returns (bytes32 result) {
        bytes memory tempEmptyStringTest = bytes(source);
        if (tempEmptyStringTest.length == 0) {
            return 0x0;
        }

        assembly {result := mload(add(source, 32))}
    }


}
