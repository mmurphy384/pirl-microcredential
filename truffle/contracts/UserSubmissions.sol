pragma solidity ^0.4.23;

contract UserSubmissions {

    //Events
    event NewSubmission(
    uint userSubmissionId,
    uint userId, 
    uint agencyId,
    uint credentialId,
    string fileIds,
    string status);

    event UpdateSubmission(
    uint userSubmissionId,
    uint userId, 
    uint agencyId,
    uint credentialId,
    string fileIds,
    string status);

    // Structs
    struct Submission {
        uint userId; 
        uint agencyId;
        uint credentialId;
        bytes32 fileIds;
        bytes32 status;
    }

    Submission[] public submissions;

    mapping(uint => uint) internal submissionCountByUserId;
    mapping(uint => uint) internal submissionCountByAgencyId;
    mapping(uint => uint) internal submissionCountByCredentialId;

    // Purpose  : To create a submission.  Files can be attached afterward.
    function addSubmission(
        uint _userId, 
        uint _agencyId, 
        uint _credentialId, 
        string _fileIds,
        string _status) 
        public payable {

        require(_agencyId > 0);
        require(_userId > 0);
        require(_credentialId > 0);

        submissions.push(Submission(
            _userId,
            _agencyId, 
            _credentialId,
            stringToBytes32(_fileIds),
            stringToBytes32(_status)
            ))-1;

        uint _id = submissions.length-1;

        submissionCountByUserId[_userId] = submissionCountByUserId[_userId] += 1;
        submissionCountByAgencyId[_agencyId] = submissionCountByAgencyId[_agencyId] += 1;
        submissionCountByCredentialId[_credentialId] = submissionCountByCredentialId[_credentialId] += 1;

        emit NewSubmission(_id, _userId, _agencyId, _credentialId, _fileIds, _status);
    }

    // Purpose  : To update a submission. Only files and statuss can be updated
    // To Do    : Put some security on this.
    function updateStatus(
        uint _submissionId, 
        string _status) public {
        
        require(_submissionId > 0);
        //require(submissions[submissionId].userId > 0);

        submissions[_submissionId].status = stringToBytes32(_status);

        emit UpdateSubmission(
            _submissionId,
            submissions[_submissionId].userId, 
            submissions[_submissionId].agencyId, 
            submissions[_submissionId].credentialId, 
            bytes32ToString(submissions[_submissionId].fileIds),
            _status);
    }

    // Purpose  : To update a submission. Only files and statuss can be updated
    // To Do    : Put some security on this.
    function updateFileIds(
        uint _submissionId, 
        string _fileIds) public {
        require(utfStringLength(_fileIds) > 0);
        require(_submissionId > 0);
        require(submissions[_submissionId].userId > 0);

        submissions[_submissionId].fileIds = stringToBytes32(_fileIds);

        emit UpdateSubmission(
            _submissionId,
            submissions[_submissionId].userId, 
            submissions[_submissionId].agencyId, 
            submissions[_submissionId].credentialId, 
            _fileIds, 
            bytes32ToString(submissions[_submissionId].status));
    }

    // Purpose  : To retrieve a credential by the id
    function getSubmissionById(uint _submissionId) public view returns (uint, uint, uint, bytes32, bytes32) {
        require(_submissionId < submissions.length);
        return (submissions[_submissionId].userId, 
            submissions[_submissionId].agencyId, 
            submissions[_submissionId].credentialId, 
            submissions[_submissionId].fileIds, 
            submissions[_submissionId].status
        ); 
    }

    function getSubmissionListByAgencyId(uint _agencyId) public view returns (bytes32[],  uint[]) {
        bytes32[] memory  statuses = new bytes32[](submissionCountByAgencyId[_agencyId]);
        uint[] memory  submissionIds = new uint[](submissionCountByAgencyId[_agencyId]);
        uint index = 0;
        for (uint i = 0; i <= submissions.length-1; i++) {
            if (submissions[i].agencyId == _agencyId) {
                statuses[index] = submissions[i].status;
                submissionIds[index] = i;
                index += 1;
            }
        }
        return (statuses, submissionIds);
    }

    function getSubmissionListByUserId(uint _userId) public view returns (bytes32[],  uint[]) {
        bytes32[] memory  statuses = new bytes32[](submissionCountByUserId[_userId]);
        uint[] memory  submissionIds = new uint[](submissionCountByUserId[_userId]);
        uint index = 0;
        for (uint i = 0; i <= submissions.length-1; i++) {
            if (submissions[i].userId == _userId) {
                statuses[index] = submissions[i].status;
                submissionIds[index] = i;
                index += 1;
            }
        }
        return (statuses, submissionIds);
    }

    function bytes32ToString(bytes32 x) internal pure returns (string) {
        bytes memory bytesString = new bytes(32);
        uint charCount = 0;
        for (uint j = 0; j < 32; j++) {
            byte char = byte(bytes32(uint(x) * 2 ** (8 * j)));
            if (char != 0) {
                bytesString[charCount] = char;
                charCount++;
            }
        }
        bytes memory bytesStringTrimmed = new bytes(charCount);
        for (j = 0; j < charCount; j++) {
            bytesStringTrimmed[j] = bytesString[j];
        }
        return string(bytesStringTrimmed);
    }

    function stringToBytes32(string memory source) internal pure returns (bytes32 result) {
        bytes memory tempEmptyStringTest = bytes(source);
        if (tempEmptyStringTest.length == 0) {
            return 0x0;
        }
        assembly {result := mload(add(source, 32))}
    }

    function utfStringLength(string str) pure internal
    returns (uint length)
    {
        uint i=0;
        bytes memory string_rep = bytes(str);

        while (i<string_rep.length)
        {
            if (string_rep[i]>>7==0)
                i+=1;
            else if (string_rep[i]>>5==0x6)
                i+=2;
            else if (string_rep[i]>>4==0xE)
                i+=3;
            else if (string_rep[i]>>3==0x1E)
                i+=4;
            else
                //For safety
                i+=1;

            length++;
        }
    }

}