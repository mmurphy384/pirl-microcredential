pragma solidity ^0.4.23;

contract Files {

    // Events
    // event NewFile(
    // string name, 
    // string url, 
    // string pirlFileHash, 
    // bool isActive, 
    // uint8 userId, 
    // uint8 userSubmissionId, 
    // uint8 agencyId);

    // event UpdateFile(
    // string name, 
    // string url, 
    // string pirlFileHash, 
    // bool isActive, 
    // uint userId, 
    // uint userSubmissionId,
    // uint agencyId);

    // Structs
    struct File {
        bytes32 name;
        bytes32 url;
        uint8 userId;
        uint8 userSubmissionId;
        uint8 agencyId;
    }

    File[] public files;
    //mapping(bytes32 => uint8) internal fileIdByHash;
    //mapping(uint => bytes32) internal fileNameById;
    //mapping(uint => uint8) internal fileCountByUserId;
    mapping(uint => uint8) internal fileCountByAgencyId;
    //mapping(uint => uint8) internal fileCountByUserSubmissionId;

    // Purpose  : To hold add a credential to the list of available credentials
    // Note     : Only agencies and users can upload files.  The file can be updated to
    //            include a userSubmissionId when it is attached to a UserSubmission.
    function addFile(string _name, string _url, string _pirlFileHash, uint8 _userId, uint8 _agencyId) public {
        
        // files.push(File(
        //     stringToBytes32(_name), 
        //     stringToBytes32(_url),
        //     stringToBytes32(_pirlFileHash),
        //     true,
        //     _userId,
        //     0, 
        //     _agencyId))-1;

        // uint id = files.length-1;
        //if (utfStringLength(_pirlFileHash) > 1)
        //    fileIdByHash[stringToBytes32(_pirlFileHash)] = id;
        //if (_userId > 0)
        //    fileCountByUserId[_userId] = fileCountByUserId[_agencyId] += 1;
        if (_agencyId > 0) {
            uint8 count = fileCountByAgencyId[_agencyId];
            fileCountByAgencyId[_agencyId] = 1;
        }

        // emit NewFile(
        //     (_name), 
        //     (_url),
        //     (_pirlFileHash),
        //     true,
        //     _userId,
        //     0, 
        //     _agencyId
        // );
    }

    // Purpose  : To update file info.  For the most part, this will be called to:
    //            Put a hash, once that becomes available.
    //            Put a UserSubmissionId to link it to a submission.
    // function updateFile(
    //     uint8 _fileId, 
    //     string _name, 
    //     string _url, 
    //     string _pirlFileHash, 
    //     bool _isActive, 
    //     uint8 _userId, 
    //     uint8 _userSubmissionId, 
    //     uint8 _agencyId) public {

    //     require(_fileId > 0 && _fileId < files.length);
    //     require(_userId > 0 || _agencyId > 0);
    //     require((files[_fileId].userId == _userId) || (files[_fileId].agencyId == _agencyId));
        
    //     //if (files[_fileId].userSubmissionId == 0 && _userSubmissionId > 0)
    //     //    fileCountByUserSubmissionId[_userSubmissionId] = fileCountByUserSubmissionId[_userSubmissionId] += 1;

    //     files[_fileId].name = stringToBytes32(_name);
    //     files[_fileId].url = stringToBytes32(_url);
    //     files[_fileId].pirlFileHash = stringToBytes32(_pirlFileHash);
    //     files[_fileId].isActive = _isActive;
    //     files[_fileId].userId = _userId;
    //     files[_fileId].userSubmissionId = _userSubmissionId;
    //     files[_fileId].agencyId = _agencyId;

    //     //if (utfStringLength(_pirlFileHash) > 1)
    //     //    fileIdByHash[stringToBytes32(_pirlFileHash)] = _fileId;

    //     emit UpdateFile(
    //         stringToBytes32(_name), 
    //         stringToBytes32(_url),
    //         stringToBytes32(_pirlFileHash),
    //         _isActive,
    //         _userId,
    //         _userSubmissionId,
    //         _agencyId
    //     );
    // }

    // Purpose  : To retrieve a credential by the id
    // function getFileById(uint _id) public view returns (bytes32, bytes32, bytes32, bool, uint8, uint8) {
    //     require(_id < files.length);
    //     return (files[_id].name, 
    //         files[_id].url, 
    //         files[_id].pirlFileHash, 
    //         files[_id].isActive, 
    //         files[_id].userId, 
    //         files[_id].agencyId); 

    // }

    // function getFileListByAgencyId(uint _agencyId) public view returns (bytes32[], uint8[]) {
    //     bytes32[] memory  names = new bytes32[](fileCountByAgencyId[_agencyId]);
    //     uint8[] memory  ids = new uint8[](fileCountByAgencyId[_agencyId]);
    //     uint8 index = 0;
    //     for (uint8 i = 0; i <= files.length-1; i++) {
    //         if (files[i].agencyId == _agencyId) {
    //             names[index] = files[i].name;
    //             ids[index] = i;
    //             index += 1;
    //         }
    //     }
    //     return (names,ids);
    // }

    // function getFileListByUserId(uint _userId) public view returns (bytes32[], uint[]) {
    //     bytes32[] memory  names = new bytes32[](fileCountByUserId[_userId]);
    //     uint[] memory  ids = new uint[](fileCountByUserId[_userId]);
    //     uint index = 0;
    //     for (uint i = 0; i <= files.length-1; i++) {
    //         if (files[i].userId == _userId) {
    //             names[index] = files[i].name;
    //             ids[index] = i;
    //             index += 1;
    //         }
    //     }
    //     return (names,ids);
    // }

    // function getFileListByUserSubmissionId(uint _userSubmissionId) public view returns (bytes32[], uint[]) {
    //     bytes32[] memory  names = new bytes32[](fileCountByUserSubmissionId[_userSubmissionId]);
    //     uint[] memory  ids = new uint[](fileCountByUserSubmissionId[_userSubmissionId]);
    //     uint index = 0;
    //     for (uint i = 0; i <= files.length-1; i++) {
    //         if (files[i].userId == _userSubmissionId) {
    //             names[index] = files[i].name;
    //             ids[index] = i;
    //             index += 1;
    //         }
    //     }
    //     return (names,ids);
    // }

    // function stringToBytes32(string memory source) internal pure returns (bytes32 result) {
    //     bytes memory tempEmptyStringTest = bytes(source);
    //     if (tempEmptyStringTest.length == 0) {
    //         return 0x0;
    //     }
    //     assembly {result := mload(add(source, 32))}
    // }

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

}