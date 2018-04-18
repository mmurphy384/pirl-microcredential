pragma solidity ^0.4.19;


contract ContractManager {

    address[] public contracts;
    uint counter;

    function ContractManager() public {
        counter = 0;
    }

    function getContractCount() public constant returns(uint) {
        //return contracts.length;
        return counter;
    }

    // deploy a new contract
    function newContract(string _agencyName) public returns(address)  {
        counter++; 
        MicroCredentialContract c = new MicroCredentialContract(msg.sender,_agencyName);
        contracts.push(c);
        return c;
    }
}

contract MicroCredentialContract {

    event NewContract(address _owner, string _AgencyName);
    event ContractNameChange(address ownerAddress, string oldName, string newName);

    string agencyName;
    address owner;

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }
    
    // contructor
    function MicroCredentialContract(address _owner, string _agencyName)  public {
        owner = _owner;
        agencyName = _agencyName;
    }
    
    function SetName(string _newAgencyName) onlyOwner() internal {
        emit ContractNameChange(msg.sender, agencyName, _newAgencyName);
        agencyName = _newAgencyName;
    }
    
}