﻿/*global web3*/

var MICROCREDENTIALS = this.MICROCREDENTIALS || {};

MICROCREDENTIALS.microCredentialContract = (function (web3) {
    "use strict";

    //Private Contract Details
    var microCredentialContractAddress = "0xCFb65D8C9eAD312CF013ac6B6e75E7305C6A826d";
    var microCredentialContractAbi = [
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
            "constant": false,
            "inputs": [
                {
                    "name": "_name",
                    "type": "string"
                },
                {
                    "name": "_url",
                    "type": "string"
                },
                {
                    "name": "_fee",
                    "type": "uint256"
                }
            ],
            "name": "addCredential",
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
            "constant": true,
            "inputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "agencies",
            "outputs": [
                {
                    "name": "agencyName",
                    "type": "bytes32"
                },
                {
                    "name": "website",
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
            "constant": true,
            "inputs": [
                {
                    "name": "_id",
                    "type": "uint256"
                }
            ],
            "name": "getCredentialById",
            "outputs": [
                {
                    "name": "name",
                    "type": "bytes32"
                },
                {
                    "name": "url",
                    "type": "bytes32"
                },
                {
                    "name": "fee",
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
            "constant": true,
            "inputs": [],
            "name": "owner",
            "outputs": [
                {
                    "name": "",
                    "type": "address"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
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
        },
        {
            "constant": true,
            "inputs": [],
            "name": "getCredentialList",
            "outputs": [
                {
                    "name": "",
                    "type": "bytes32[]"
                }
            ],
            "payable": false,
            "stateMutability": "view",
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
            "constant": true,
            "inputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "credentials",
            "outputs": [
                {
                    "name": "name",
                    "type": "bytes32"
                },
                {
                    "name": "url",
                    "type": "bytes32"
                },
                {
                    "name": "isActive",
                    "type": "bool"
                },
                {
                    "name": "fee",
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
                    "name": "_name",
                    "type": "string"
                }
            ],
            "name": "getCredentialByName",
            "outputs": [
                {
                    "name": "name",
                    "type": "bytes32"
                },
                {
                    "name": "url",
                    "type": "bytes32"
                },
                {
                    "name": "fee",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "transferOwnership",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "payable": true,
            "stateMutability": "payable",
            "type": "fallback"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "name": "_from",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "Deposit",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "name": "_to",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "_amount",
                    "type": "uint256"
                }
            ],
            "name": "Withdraw",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "name": "_remainingBalance",
                    "type": "uint256"
                }
            ],
            "name": "Balance",
            "type": "event"
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
            "name": "NewCredential",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "previousOwner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "OwnershipTransferred",
            "type": "event"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_amount",
                    "type": "uint256"
                }
            ],
            "name": "withdraw",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_agencyName",
                    "type": "bytes32"
                },
                {
                    "name": "_website",
                    "type": "bytes32"
                },
                {
                    "name": "_email",
                    "type": "bytes32"
                }
            ],
            "name": "updateAgencyInfo",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_agencyName",
                    "type": "string"
                },
                {
                    "name": "_website",
                    "type": "string"
                },
                {
                    "name": "_email",
                    "type": "string"
                }
            ],
            "name": "registerAgency",
            "outputs": [],
            "payable": true,
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "_agencyName",
                    "type": "string"
                }
            ],
            "name": "getAgencyInfo",
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
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [],
            "name": "setAgencyInactive",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [],
            "name": "setAgencyActive",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "getContractBalance",
            "outputs": [
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
            "constant": false,
            "inputs": [],
            "name": "destroy",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ];

    //Contract Functions
    function registerAgency(agency) {
        
    }

    function updateAgencyInfo(agency) {
        
    }

    function setAgencyInactive() {
        
    }

    return {
        registerAgency: registerAgency,
        updateAgencyInfo: updateAgencyInfo,
        setAgencyInactive: setAgencyInactive
    };
}(web3));