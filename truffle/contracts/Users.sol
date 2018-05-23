pragma solidity ^0.4.19;

contract Users  {

    // Events
    event NewUser(uint id, string firstName, string lastName, string email, address userAddress);
    event UpdateUser(uint id, string firstName, string lastName, string email, address userAddress);
    event DepositUsers(address from, uint value);
    event WithdrawUsers(address to, uint amount);
    event BalanceUsers(uint remainingBalance);

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

    address public owner;
    User[] public users;
    mapping(bytes32 => uint) internal userIdByEmail;
    mapping(address => uint) internal userIdByAddress;
    uint userCount = 0;

    // Register a root user
    constructor() public {
        owner = msg.sender;
        addUser("Mike","Murphy","mmurphy384@yahoo.com");
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    // Purpose  : Fallback Function
    function() public payable {
        if (msg.value > 0) {
            emit DepositUsers(msg.sender, msg.value);
            emit BalanceUsers(address(this).balance);
        }
    }

    // Purpose  : For the owner to withdraw some funds.
    function withdraw(uint _amount) public onlyOwner {
        require(address(this).balance > 0);
        require(_amount > 0);
        require(address(this).balance >= _amount);
        address(msg.sender).transfer(_amount);
        emit WithdrawUsers(msg.sender, _amount);
        emit BalanceUsers(address(this).balance);
    }

    // Purpose  : User adds their own account
    function addUser(string _firstName, string _lastName, string _email) public {
        require(userIdByEmail[stringToBytes32(_email)] == 0);
        require(userIdByAddress[msg.sender] == 0);
        uint id = 0;
        id = users.push(User(stringToBytes32(_firstName), stringToBytes32(_lastName),stringToBytes32(_email), true))-1;
        userIdByEmail[stringToBytes32(_email)] = id;
        userIdByAddress[msg.sender] = id;
        userCount += 1;
        emit NewUser(id, _firstName,_lastName, _email, msg.sender);
    }

    // Purpose  : To update user about a person
    function updateUser(string _firstName, string _lastName, string _email) onlyUserOwner public {
        require(userIdByAddress[msg.sender] > 0);
        //require(utfStringLength(_email) > 4);
        uint id = userIdByAddress[msg.sender];
        users[id].firstName = stringToBytes32(_firstName);
        users[id].lastName = stringToBytes32(_lastName);
        users[id].email = stringToBytes32(_email);
        userIdByEmail[stringToBytes32(_email)] = id;
        emit UpdateUser(id, _firstName, _lastName, _email, msg.sender);
    }

    // Purpose  : To retrieve a users id via email
    // function getIdByEmail(string _email) public view returns (uint) {
    //     //require(utfStringLength(_email) > 0);
    //     require(userIdByEmail[stringToBytes32(_email)] > 0);
    //     return userIdByEmail[stringToBytes32(_email)];
    // }

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
        require(_id < userCount);
        return (users[_id].firstName, users[_id].lastName, users[_id].email, users[_id].isActive, _id); 
    }

    // function getUserByEmail(string _email) public view returns  (bytes32, bytes32, bytes32, bool, uint) {
    //     uint _id = userIdByEmail[stringToBytes32(_email)];
    //     require(users[_id].email.length > 0);
    //     require(_id < users.length);
    //     return (users[_id].firstName, users[_id].lastName, users[_id].email, users[_id].isActive, _id); 
    // }

    function getUserByAddress(address _address) public view returns (bytes32, bytes32, bytes32, bool, uint) {
        uint _id = userIdByAddress[_address];
        //require(users[_id].email.length > 0);
        //require(_id < userCount);
        return (users[_id].firstName, users[_id].lastName, users[_id].email, users[_id].isActive, _id); 
    }

    // function getUserList() public view returns (bytes32[], bytes32[], bytes32[], bool[]) {
    //     require(userCount >= 0);
    //     bytes32[] memory firstNames = new bytes32[](userCount);
    //     bytes32[] memory lastNames = new bytes32[](userCount);
    //     bytes32[] memory emails = new bytes32[](userCount);
    //     bool[] memory isActives = new bool[](userCount);
    //     for (uint i = 0; i < userCount; i++) {
    //         firstNames[i] = users[i].firstName;
    //         lastNames[i] = users[i].lastName;
    //         emails[i] = users[i].email;
    //         isActives[i] = users[i].isActive;
    //     }
    //     return (firstNames, lastNames, emails, isActives);
    // }

    // Purpose  : Determines if the address is a user
    function addressIsUser(address _address) public view returns (bool) {
        uint id = userIdByAddress[_address];
        return (id > 0);
    }

    // function bytes32ToString(bytes32 x) internal pure returns (string) {
    //     bytes memory bytesString = new bytes(32);
    //     uint charCount = 0;
    //     for (uint j = 0; j < 32; j++) {
    //         byte char = byte(bytes32(uint(x) * 2 ** (8 * j)));
    //         if (char != 0) {
    //             bytesString[charCount] = char;
    //             charCount++;
    //         }
    //     }
    //     bytes memory bytesStringTrimmed = new bytes(charCount);
    //     for (j = 0; j < charCount; j++) {
    //         bytesStringTrimmed[j] = bytesString[j];
    //     }
    //     return string(bytesStringTrimmed);
    // }

    function stringToBytes32(string memory source) internal pure returns (bytes32 result) {
        bytes memory tempEmptyStringTest = bytes(source);
        if (tempEmptyStringTest.length == 0) {
            return 0x0;
        }
        assembly {result := mload(add(source, 32))}
    }

    // function utfStringLength(string str) pure internal
    // returns (uint length)
    // {
    //     uint i=0;
    //     bytes memory string_rep = bytes(str);

    //     while (i<string_rep.length)
    //     {
    //         if (string_rep[i]>>7==0)
    //             i+=1;
    //         else if (string_rep[i]>>5==0x6)
    //             i+=2;
    //         else if (string_rep[i]>>4==0xE)
    //             i+=3;
    //         else if (string_rep[i]>>3==0x1E)
    //             i+=4;
    //         else
    //             //For safety
    //             i+=1;

    //         length++;
    //     }
    // }

    // Purpsoe  : Owners with draw all pirl from contract.  Shutting contract down.
    function destroy() public onlyOwner {
        withdraw(address(this).balance);
    }

}