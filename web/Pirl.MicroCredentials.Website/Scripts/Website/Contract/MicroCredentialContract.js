/*global web3*/

var MICROCREDENTIALS = this.MICROCREDENTIALS || {};

MICROCREDENTIALS.microCredentialContract = (function (web3) {
    "use strict";

    //Private Contract Details
    var microCredentialContractAddress = "0x5b1869d9a4c187f2eaa108f3062412ecf0526b24";
    var microCredentialContractAbi = [
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
                                                },
                                                {
                                                    "name": "exists",
                                                    "type": "bool"
                                                }
                                            ],
                                            "payable": false,
                                            "stateMutability": "view",
                                            "type": "function"
                                        },
                                        {
                                            "inputs": [],
                                            "payable": false,
                                            "stateMutability": "nonpayable",
                                            "type": "constructor"
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
                                            "name": "DepositMicroCredential",
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
                                            "name": "WithdrawMicroCredential",
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
                                            "name": "BalanceMicroCredential",
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
                                                    "type": "string"
                                                },
                                                {
                                                    "name": "_website",
                                                    "type": "string"
                                                },
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
                                            "name": "registerAgency",
                                            "outputs": [],
                                            "payable": true,
                                            "stateMutability": "payable",
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
                                            "name": "updateAgencyInfo",
                                            "outputs": [],
                                            "payable": false,
                                            "stateMutability": "nonpayable",
                                            "type": "function"
                                        },
                                        {
                                            "constant": true,
                                            "inputs": [],
                                            "name": "getAgencyCount",
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
                                            "constant": true,
                                            "inputs": [
                                                {
                                                    "name": "_address",
                                                    "type": "address"
                                                }
                                            ],
                                            "name": "getAgencyInfoByAddress",
                                            "outputs": [
                                                {
                                                    "name": "agencyName",
                                                    "type": "bytes32"
                                                },
                                                {
                                                    "name": "firstName",
                                                    "type": "bytes32"
                                                },
                                                {
                                                    "name": "lastName",
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
                                                },
                                                {
                                                    "name": "id",
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
                                            "name": "getAgencyInfoById",
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
                                            "name": "getAgencyIdByAddress",
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
                                            "constant": true,
                                            "inputs": [
                                                {
                                                    "name": "_address",
                                                    "type": "address"
                                                }
                                            ],
                                            "name": "addressIsAgency",
                                            "outputs": [
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
                                            "constant": true,
                                            "inputs": [],
                                            "name": "getAgencies",
                                            "outputs": [
                                                {
                                                    "name": "",
                                                    "type": "bytes32[]"
                                                },
                                                {
                                                    "name": "",
                                                    "type": "uint256[]"
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

                                                                    return {
                                                                        microCredentialContractAddress: microCredentialContractAddress,
                                                                        microCredentialContractAbi: microCredentialContractAbi
                                                                    };
                                                                }(web3));