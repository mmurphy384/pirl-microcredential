pragma solidity ^0.4.19;


contract App  {

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
        bytes32 requirements;
        bytes32 name;
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

    function App(address _owner) public {
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
    function createCredential(bytes32 requirements, bytes32 name) public onlyOwner returns (bool){
        Credential memory cred = Credential(requirements,name,true);
        credentialList.push(cred);
        return true;
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
    function credentialReceived(uint index) public constant onlyOwner returns (bool){
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

}


contract Factory {

    mapping (address=>address) apps;

    function deployNewContract() public returns (bool){
        require(apps[msg.sender]==address(0));
        App app = new App(msg.sender);
        apps[msg.sender] = address(app);
        return true;
    }

    function getContractAddress() constant public returns (address) {
        return apps[msg.sender];
    }

}