using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Pirl.MicroCredentials.Core.Contracts.Interfaces;

namespace Pirl.MicroCredentials.Core.Contracts
{
    public class UserContract : IUserContract
    {
        public string GetContractAddress()
        {
            return "0xdb56f2e9369e0d7bd191099125a3f6c370f8ed15";
        }

        public string GetContractAbi()
        {
            return @"[
                        {
                          'constant': true,
                          'inputs': [
                            {
                              'name': '',
                              'type': 'uint256'
                            }
                          ],
                          'name': 'users',
                          'outputs': [
                            {
                              'name': 'firstName',
                              'type': 'bytes32'
                            },
                            {
                              'name': 'lastName',
                              'type': 'bytes32'
                            },
                            {
                              'name': 'email',
                              'type': 'bytes32'
                            },
                            {
                              'name': 'isActive',
                              'type': 'bool'
                            }
                          ],
                          'payable': false,
                          'stateMutability': 'view',
                          'type': 'function'
                        },
                        {
                          'anonymous': false,
                          'inputs': [
                            {
                              'indexed': false,
                              'name': 'id',
                              'type': 'uint256'
                            },
                            {
                              'indexed': false,
                              'name': 'firstName',
                              'type': 'string'
                            },
                            {
                              'indexed': false,
                              'name': 'lastName',
                              'type': 'string'
                            },
                            {
                              'indexed': false,
                              'name': 'email',
                              'type': 'string'
                            },
                            {
                              'indexed': false,
                              'name': 'userAddress',
                              'type': 'address'
                            }
                          ],
                          'name': 'NewUser',
                          'type': 'event'
                        },
                        {
                          'anonymous': false,
                          'inputs': [
                            {
                              'indexed': false,
                              'name': 'id',
                              'type': 'uint256'
                            },
                            {
                              'indexed': false,
                              'name': 'firstName',
                              'type': 'string'
                            },
                            {
                              'indexed': false,
                              'name': 'lastName',
                              'type': 'string'
                            },
                            {
                              'indexed': false,
                              'name': 'email',
                              'type': 'string'
                            },
                            {
                              'indexed': false,
                              'name': 'userAddress',
                              'type': 'address'
                            }
                          ],
                          'name': 'UpdateUser',
                          'type': 'event'
                        },
                        {
                          'constant': false,
                          'inputs': [
                            {
                              'name': '_firstName',
                              'type': 'string'
                            },
                            {
                              'name': '_lastName',
                              'type': 'string'
                            },
                            {
                              'name': '_email',
                              'type': 'string'
                            }
                          ],
                          'name': 'addUser',
                          'outputs': [],
                          'payable': false,
                          'stateMutability': 'nonpayable',
                          'type': 'function'
                        },
                        {
                          'constant': false,
                          'inputs': [
                            {
                              'name': '_firstName',
                              'type': 'string'
                            },
                            {
                              'name': '_lastName',
                              'type': 'string'
                            },
                            {
                              'name': '_email',
                              'type': 'string'
                            }
                          ],
                          'name': 'updateUser',
                          'outputs': [],
                          'payable': false,
                          'stateMutability': 'nonpayable',
                          'type': 'function'
                        },
                        {
                          'constant': true,
                          'inputs': [
                            {
                              'name': '_email',
                              'type': 'string'
                            }
                          ],
                          'name': 'getIdByEmail',
                          'outputs': [
                            {
                              'name': '',
                              'type': 'uint256'
                            }
                          ],
                          'payable': false,
                          'stateMutability': 'view',
                          'type': 'function'
                        },
                        {
                          'constant': true,
                          'inputs': [
                            {
                              'name': '_address',
                              'type': 'address'
                            }
                          ],
                          'name': 'getIdByAddress',
                          'outputs': [
                            {
                              'name': '',
                              'type': 'uint256'
                            }
                          ],
                          'payable': false,
                          'stateMutability': 'view',
                          'type': 'function'
                        },
                        {
                          'constant': true,
                          'inputs': [],
                          'name': 'getMyId',
                          'outputs': [
                            {
                              'name': '',
                              'type': 'uint256'
                            }
                          ],
                          'payable': false,
                          'stateMutability': 'view',
                          'type': 'function'
                        },
                        {
                          'constant': true,
                          'inputs': [
                            {
                              'name': '_id',
                              'type': 'uint256'
                            }
                          ],
                          'name': 'getUserById',
                          'outputs': [
                            {
                              'name': '',
                              'type': 'bytes32'
                            },
                            {
                              'name': '',
                              'type': 'bytes32'
                            },
                            {
                              'name': '',
                              'type': 'bytes32'
                            },
                            {
                              'name': '',
                              'type': 'bool'
                            },
                            {
                              'name': '',
                              'type': 'uint256'
                            }
                          ],
                          'payable': false,
                          'stateMutability': 'view',
                          'type': 'function'
                        },
                        {
                          'constant': true,
                          'inputs': [
                            {
                              'name': '_email',
                              'type': 'string'
                            }
                          ],
                          'name': 'getUserByEmail',
                          'outputs': [
                            {
                              'name': '',
                              'type': 'bytes32'
                            },
                            {
                              'name': '',
                              'type': 'bytes32'
                            },
                            {
                              'name': '',
                              'type': 'bytes32'
                            },
                            {
                              'name': '',
                              'type': 'bool'
                            },
                            {
                              'name': '',
                              'type': 'uint256'
                            }
                          ],
                          'payable': false,
                          'stateMutability': 'view',
                          'type': 'function'
                        },
                        {
                          'constant': true,
                          'inputs': [
                            {
                              'name': '_address',
                              'type': 'address'
                            }
                          ],
                          'name': 'getUserByAddress',
                          'outputs': [
                            {
                              'name': '',
                              'type': 'bytes32'
                            },
                            {
                              'name': '',
                              'type': 'bytes32'
                            },
                            {
                              'name': '',
                              'type': 'bytes32'
                            },
                            {
                              'name': '',
                              'type': 'bool'
                            },
                            {
                              'name': '',
                              'type': 'uint256'
                            }
                          ],
                          'payable': false,
                          'stateMutability': 'view',
                          'type': 'function'
                        },
                        {
                          'constant': true,
                          'inputs': [],
                          'name': 'getUserList',
                          'outputs': [
                            {
                              'name': '',
                              'type': 'bytes32[]'
                            },
                            {
                              'name': '',
                              'type': 'bytes32[]'
                            },
                            {
                              'name': '',
                              'type': 'bytes32[]'
                            },
                            {
                              'name': '',
                              'type': 'bool[]'
                            }
                          ],
                          'payable': false,
                          'stateMutability': 'view',
                          'type': 'function'
                        },
                        {
                          'constant': true,
                          'inputs': [
                            {
                              'name': '_address',
                              'type': 'address'
                            }
                          ],
                          'name': 'addressIsUser',
                          'outputs': [
                            {
                              'name': '',
                              'type': 'bool'
                            }
                          ],
                          'payable': false,
                          'stateMutability': 'view',
                          'type': 'function'
                        }
                      ]";
        }
    }
}
