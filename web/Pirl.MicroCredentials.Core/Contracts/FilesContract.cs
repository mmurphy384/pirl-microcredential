using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Pirl.MicroCredentials.Core.Contracts.Interfaces;

namespace Pirl.MicroCredentials.Core.Contracts
{
    public class FilesContract : IFilesContract
    {
        public string GetContractAddress()
        {
            return "0x254dffcd3277c0b1660f6d42efbb754edababc2b";
        }

        public string GetContractAbi()
        {
            return @"[
                        {
                          'constant': true,
                          'inputs': [],
                          'name': 'owner',
                          'outputs': [
                            {
                              'name': '',
                              'type': 'address'
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
                              'name': '',
                              'type': 'uint256'
                            }
                          ],
                          'name': 'files',
                          'outputs': [
                            {
                              'name': 'name',
                              'type': 'bytes32'
                            },
                            {
                              'name': 'url',
                              'type': 'bytes32'
                            },
                            {
                              'name': 'pirlFileHash',
                              'type': 'bytes32'
                            },
                            {
                              'name': 'isActive',
                              'type': 'bool'
                            },
                            {
                              'name': 'userId',
                              'type': 'uint256'
                            },
                            {
                              'name': 'userSubmissionId',
                              'type': 'uint256'
                            },
                            {
                              'name': 'agencyId',
                              'type': 'uint256'
                            }
                          ],
                          'payable': false,
                          'stateMutability': 'view',
                          'type': 'function'
                        },
                        {
                          'inputs': [],
                          'payable': false,
                          'stateMutability': 'nonpayable',
                          'type': 'constructor'
                        },
                        {
                          'payable': true,
                          'stateMutability': 'payable',
                          'type': 'fallback'
                        },
                        {
                          'anonymous': false,
                          'inputs': [
                            {
                              'indexed': false,
                              'name': 'name',
                              'type': 'string'
                            },
                            {
                              'indexed': false,
                              'name': 'url',
                              'type': 'string'
                            },
                            {
                              'indexed': false,
                              'name': 'pirlFileHash',
                              'type': 'string'
                            },
                            {
                              'indexed': false,
                              'name': 'isActive',
                              'type': 'bool'
                            },
                            {
                              'indexed': false,
                              'name': 'userId',
                              'type': 'uint256'
                            },
                            {
                              'indexed': false,
                              'name': 'userSubmissionId',
                              'type': 'uint256'
                            },
                            {
                              'indexed': false,
                              'name': 'agencyId',
                              'type': 'uint256'
                            }
                          ],
                          'name': 'NewFile',
                          'type': 'event'
                        },
                        {
                          'anonymous': false,
                          'inputs': [
                            {
                              'indexed': false,
                              'name': 'name',
                              'type': 'string'
                            },
                            {
                              'indexed': false,
                              'name': 'url',
                              'type': 'string'
                            },
                            {
                              'indexed': false,
                              'name': 'pirlFileHash',
                              'type': 'string'
                            },
                            {
                              'indexed': false,
                              'name': 'isActive',
                              'type': 'bool'
                            },
                            {
                              'indexed': false,
                              'name': 'userId',
                              'type': 'uint256'
                            },
                            {
                              'indexed': false,
                              'name': 'userSubmissionId',
                              'type': 'uint256'
                            },
                            {
                              'indexed': false,
                              'name': 'agencyId',
                              'type': 'uint256'
                            }
                          ],
                          'name': 'UpdateFile',
                          'type': 'event'
                        },
                        {
                          'anonymous': false,
                          'inputs': [
                            {
                              'indexed': false,
                              'name': '_from',
                              'type': 'address'
                            },
                            {
                              'indexed': false,
                              'name': 'value',
                              'type': 'uint256'
                            }
                          ],
                          'name': 'DepositFiles',
                          'type': 'event'
                        },
                        {
                          'anonymous': false,
                          'inputs': [
                            {
                              'indexed': false,
                              'name': '_to',
                              'type': 'address'
                            },
                            {
                              'indexed': false,
                              'name': '_amount',
                              'type': 'uint256'
                            }
                          ],
                          'name': 'WithdrawFiles',
                          'type': 'event'
                        },
                        {
                          'anonymous': false,
                          'inputs': [
                            {
                              'indexed': false,
                              'name': '_remainingBalance',
                              'type': 'uint256'
                            }
                          ],
                          'name': 'BalanceFiles',
                          'type': 'event'
                        },
                        {
                          'constant': false,
                          'inputs': [
                            {
                              'name': '_amount',
                              'type': 'uint256'
                            }
                          ],
                          'name': 'withdraw',
                          'outputs': [],
                          'payable': false,
                          'stateMutability': 'nonpayable',
                          'type': 'function'
                        },
                        {
                          'constant': false,
                          'inputs': [
                            {
                              'name': '_name',
                              'type': 'string'
                            },
                            {
                              'name': '_url',
                              'type': 'string'
                            },
                            {
                              'name': '_pirlFileHash',
                              'type': 'string'
                            },
                            {
                              'name': '_userId',
                              'type': 'uint256'
                            },
                            {
                              'name': '_agencyId',
                              'type': 'uint256'
                            }
                          ],
                          'name': 'addFile',
                          'outputs': [],
                          'payable': false,
                          'stateMutability': 'nonpayable',
                          'type': 'function'
                        },
                        {
                          'constant': false,
                          'inputs': [
                            {
                              'name': '_fileId',
                              'type': 'uint256'
                            },
                            {
                              'name': '_name',
                              'type': 'string'
                            },
                            {
                              'name': '_url',
                              'type': 'string'
                            },
                            {
                              'name': '_pirlFileHash',
                              'type': 'string'
                            },
                            {
                              'name': '_isActive',
                              'type': 'bool'
                            },
                            {
                              'name': '_userId',
                              'type': 'uint256'
                            },
                            {
                              'name': '_userSubmissionId',
                              'type': 'uint256'
                            },
                            {
                              'name': '_agencyId',
                              'type': 'uint256'
                            }
                          ],
                          'name': 'updateFileById',
                          'outputs': [],
                          'payable': false,
                          'stateMutability': 'nonpayable',
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
                          'name': 'getFileById',
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
                            },
                            {
                              'name': '',
                              'type': 'uint256'
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
                              'name': '_agencyId',
                              'type': 'uint256'
                            }
                          ],
                          'name': 'getFileListByAgencyId',
                          'outputs': [
                            {
                              'name': '',
                              'type': 'bytes32[]'
                            },
                            {
                              'name': '',
                              'type': 'uint256[]'
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
                              'name': '_userId',
                              'type': 'uint256'
                            }
                          ],
                          'name': 'getFileListByUserId',
                          'outputs': [
                            {
                              'name': '',
                              'type': 'bytes32[]'
                            },
                            {
                              'name': '',
                              'type': 'uint256[]'
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
                              'name': '_userSubmissionId',
                              'type': 'uint256'
                            }
                          ],
                          'name': 'getFileListByUserSubmissionId',
                          'outputs': [
                            {
                              'name': '',
                              'type': 'bytes32[]'
                            },
                            {
                              'name': '',
                              'type': 'uint256[]'
                            }
                          ],
                          'payable': false,
                          'stateMutability': 'view',
                          'type': 'function'
                        },
                        {
                          'constant': false,
                          'inputs': [],
                          'name': 'destroy',
                          'outputs': [],
                          'payable': false,
                          'stateMutability': 'nonpayable',
                          'type': 'function'
                        }
                      ]";
        }
    }
}
