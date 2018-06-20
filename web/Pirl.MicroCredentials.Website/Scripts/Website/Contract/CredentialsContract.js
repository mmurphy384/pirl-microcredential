/*global web3*/

var MICROCREDENTIALS = this.MICROCREDENTIALS || {};

MICROCREDENTIALS.credentialsContract = (function (web3) {
    "use strict";

    //Private Contract Details
    var credentialsContractAddress = "0x5b1869d9a4c187f2eaa108f3062412ecf0526b24";
    var credentialsContractAbi = [
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
                                    },
                                    {
                                        "name": "agencyId",
                                        "type": "uint256"
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
                                "name": "DepositCredentials",
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
                                "name": "WithdrawCredentials",
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
                                "name": "BalanceCredentials",
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
                                    },
                                    {
                                        "name": "_agencyId",
                                        "type": "uint256"
                                    }
                                ],
                                "name": "addCredential",
                                "outputs": [],
                                "payable": false,
                                "stateMutability": "nonpayable",
                                "type": "function"
                            },
                            {
                                "constant": false,
                                "inputs": [
                                    {
                                        "name": "credentialId",
                                        "type": "uint256"
                                    },
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
                                    },
                                    {
                                        "name": "_isActive",
                                        "type": "bool"
                                    }
                                ],
                                "name": "updateCredentialById",
                                "outputs": [],
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
                                        "name": "_agencyId",
                                        "type": "uint256"
                                    }
                                ],
                                "name": "getCredentialListByAgencyId",
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
        credentialsContractAddress: credentialsContractAddress,
        credentialsContractAbi: credentialsContractAbi
    };
}(web3));