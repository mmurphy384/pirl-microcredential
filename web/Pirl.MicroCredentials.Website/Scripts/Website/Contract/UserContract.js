/*global web3*/

var MICROCREDENTIALS = this.MICROCREDENTIALS || {};

MICROCREDENTIALS.userContract = (function (web3) {
    "use strict";

    //Private Contract Details
    var userContractAddress = "0xc89ce4735882c9f0f0fe26686c53074e09b0d550";
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
                                        "name": "id",
                                        "type": "uint256"
                                    },
                                    {
                                        "indexed": false,
                                        "name": "firstName",
                                        "type": "string"
                                    },
                                    {
                                        "indexed": false,
                                        "name": "lastName",
                                        "type": "string"
                                    },
                                    {
                                        "indexed": false,
                                        "name": "email",
                                        "type": "string"
                                    },
                                    {
                                        "indexed": false,
                                        "name": "userAddress",
                                        "type": "address"
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
                                        "name": "id",
                                        "type": "uint256"
                                    },
                                    {
                                        "indexed": false,
                                        "name": "firstName",
                                        "type": "string"
                                    },
                                    {
                                        "indexed": false,
                                        "name": "lastName",
                                        "type": "string"
                                    },
                                    {
                                        "indexed": false,
                                        "name": "email",
                                        "type": "string"
                                    },
                                    {
                                        "indexed": false,
                                        "name": "userAddress",
                                        "type": "address"
                                    }
                                ],
                                "name": "UpdateUser",
                                "type": "event"
                            },
                            {
                                "anonymous": false,
                                "inputs": [
                                    {
                                        "indexed": false,
                                        "name": "from",
                                        "type": "address"
                                    },
                                    {
                                        "indexed": false,
                                        "name": "value",
                                        "type": "uint256"
                                    }
                                ],
                                "name": "DepositUsers",
                                "type": "event"
                            },
                            {
                                "anonymous": false,
                                "inputs": [
                                    {
                                        "indexed": false,
                                        "name": "to",
                                        "type": "address"
                                    },
                                    {
                                        "indexed": false,
                                        "name": "amount",
                                        "type": "uint256"
                                    }
                                ],
                                "name": "WithdrawUsers",
                                "type": "event"
                            },
                            {
                                "anonymous": false,
                                "inputs": [
                                    {
                                        "indexed": false,
                                        "name": "remainingBalance",
                                        "type": "uint256"
                                    }
                                ],
                                "name": "BalanceUsers",
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
                                "name": "updateUser",
                                "outputs": [],
                                "payable": false,
                                "stateMutability": "nonpayable",
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
                                "name": "getIdByAddress",
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
                                "inputs": [],
                                "name": "getMyId",
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
                                        "name": "_address",
                                        "type": "address"
                                    }
                                ],
                                "name": "getUserByAddress",
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
                                        "name": "_address",
                                        "type": "address"
                                    }
                                ],
                                "name": "addressIsUser",
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
                                                userContractAddress: userContractAddress,
                                                userContractAbi: userContractAbi
                                            };
                                        }(web3));