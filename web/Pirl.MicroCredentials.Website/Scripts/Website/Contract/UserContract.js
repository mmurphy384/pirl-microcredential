/*global web3*/

var MICROCREDENTIALS = this.MICROCREDENTIALS || {};

MICROCREDENTIALS.userContract = (function (web3) {
    "use strict";

    //Private Contract Details
    var userContractAddress = "0xCFb65D8C9eAD312CF013ac6B6e75E7305C6A826d";
    var userContractAbi = [
        {
            "constant": true,
            "inputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "users",
            "outputs": [
                {
                    "name": "firstName",
                    "type": "bytes32"
                },
                {
                    "name": "lastName",
                    "type": "bytes32"
                },
                {
                    "name": "email",
                    "type": "bytes32"
                },
                {
                    "name": "isActive",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "name": "name",
                    "type": "bytes32"
                },
                {
                    "indexed": false,
                    "name": "url",
                    "type": "bytes32"
                },
                {
                    "indexed": false,
                    "name": "isActive",
                    "type": "bytes32"
                },
                {
                    "indexed": false,
                    "name": "fee",
                    "type": "uint256"
                }
            ],
            "name": "NewUser",
            "type": "event"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_firstName",
                    "type": "string"
                },
                {
                    "name": "_lastName",
                    "type": "string"
                },
                {
                    "name": "_email",
                    "type": "string"
                }
            ],
            "name": "addUser",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_email",
                    "type": "string"
                }
            ],
            "name": "getIdByEmail",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_address",
                    "type": "address"
                }
            ],
            "name": "getIdByAddress",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [],
            "name": "getMyId",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "_id",
                    "type": "uint256"
                }
            ],
            "name": "getUserById",
            "outputs": [
                {
                    "name": "",
                    "type": "bytes32"
                },
                {
                    "name": "",
                    "type": "bytes32"
                },
                {
                    "name": "",
                    "type": "bytes32"
                },
                {
                    "name": "",
                    "type": "bool"
                },
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "_email",
                    "type": "string"
                }
            ],
            "name": "getUserByEmail",
            "outputs": [
                {
                    "name": "",
                    "type": "bytes32"
                },
                {
                    "name": "",
                    "type": "bytes32"
                },
                {
                    "name": "",
                    "type": "bytes32"
                },
                {
                    "name": "",
                    "type": "bool"
                },
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "_address",
                    "type": "address"
                }
            ],
            "name": "getUserByAddress",
            "outputs": [
                {
                    "name": "",
                    "type": "bytes32"
                },
                {
                    "name": "",
                    "type": "bytes32"
                },
                {
                    "name": "",
                    "type": "bytes32"
                },
                {
                    "name": "",
                    "type": "bool"
                },
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "getUserList",
            "outputs": [
                {
                    "name": "",
                    "type": "bytes32[]"
                },
                {
                    "name": "",
                    "type": "bytes32[]"
                },
                {
                    "name": "",
                    "type": "bytes32[]"
                },
                {
                    "name": "",
                    "type": "bool[]"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }
    ];

    //Contract Functions
    function registerUser(user) {
        
    }

    function updateUser(agency) {
        
    }

    return {
        registerUser: registerUser,
        updateUser: updateUser
    };
}(web3));