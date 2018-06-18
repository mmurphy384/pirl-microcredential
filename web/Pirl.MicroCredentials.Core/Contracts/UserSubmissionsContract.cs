using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Pirl.MicroCredentials.Core.Contracts.Interfaces;

namespace Pirl.MicroCredentials.Core.Contracts
{
    public class UserSubmissionsContract : IUserSubmissionsContract
    {
        public string GetContractAddress()
        {
            return "0xc89ce4735882c9f0f0fe26686c53074e09b0d550";
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
                          'name': 'submissions',
                          'outputs': [
                            {
                              'name': 'userId',
                              'type': 'uint256'
                            },
                            {
                              'name': 'agencyId',
                              'type': 'uint256'
                            },
                            {
                              'name': 'credentialId',
                              'type': 'uint256'
                            },
                            {
                              'name': 'fileIds',
                              'type': 'bytes32'
                            },
                            {
                              'name': 'status',
                              'type': 'bytes32'
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
                              'name': 'userSubmissionId',
                              'type': 'uint256'
                            },
                            {
                              'indexed': false,
                              'name': 'userId',
                              'type': 'uint256'
                            },
                            {
                              'indexed': false,
                              'name': 'agencyId',
                              'type': 'uint256'
                            },
                            {
                              'indexed': false,
                              'name': 'credentialId',
                              'type': 'uint256'
                            },
                            {
                              'indexed': false,
                              'name': 'fileIds',
                              'type': 'string'
                            },
                            {
                              'indexed': false,
                              'name': 'status',
                              'type': 'string'
                            }
                          ],
                          'name': 'NewSubmission',
                          'type': 'event'
                        },
                        {
                          'anonymous': false,
                          'inputs': [
                            {
                              'indexed': false,
                              'name': 'userSubmissionId',
                              'type': 'uint256'
                            },
                            {
                              'indexed': false,
                              'name': 'userId',
                              'type': 'uint256'
                            },
                            {
                              'indexed': false,
                              'name': 'agencyId',
                              'type': 'uint256'
                            },
                            {
                              'indexed': false,
                              'name': 'credentialId',
                              'type': 'uint256'
                            },
                            {
                              'indexed': false,
                              'name': 'fileIds',
                              'type': 'string'
                            },
                            {
                              'indexed': false,
                              'name': 'status',
                              'type': 'string'
                            }
                          ],
                          'name': 'UpdateSubmission',
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
                          'name': 'DepositUserSubmissions',
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
                          'name': 'WithdrawUserSubmissions',
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
                          'name': 'BalanceUserSubmissions',
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
                              'name': '_userId',
                              'type': 'uint256'
                            },
                            {
                              'name': '_agencyId',
                              'type': 'uint256'
                            },
                            {
                              'name': '_credentialId',
                              'type': 'uint256'
                            },
                            {
                              'name': '_fileIds',
                              'type': 'string'
                            },
                            {
                              'name': '_status',
                              'type': 'string'
                            }
                          ],
                          'name': 'addSubmission',
                          'outputs': [],
                          'payable': true,
                          'stateMutability': 'payable',
                          'type': 'function'
                        },
                        {
                          'constant': false,
                          'inputs': [
                            {
                              'name': '_submissionId',
                              'type': 'uint256'
                            },
                            {
                              'name': '_status',
                              'type': 'string'
                            }
                          ],
                          'name': 'updateStatus',
                          'outputs': [],
                          'payable': false,
                          'stateMutability': 'nonpayable',
                          'type': 'function'
                        },
                        {
                          'constant': false,
                          'inputs': [
                            {
                              'name': '_submissionId',
                              'type': 'uint256'
                            },
                            {
                              'name': '_fileIds',
                              'type': 'string'
                            }
                          ],
                          'name': 'updateFileIds',
                          'outputs': [],
                          'payable': false,
                          'stateMutability': 'nonpayable',
                          'type': 'function'
                        },
                        {
                          'constant': true,
                          'inputs': [
                            {
                              'name': '_submissionId',
                              'type': 'uint256'
                            }
                          ],
                          'name': 'getSubmissionById',
                          'outputs': [
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
                            },
                            {
                              'name': '',
                              'type': 'bytes32'
                            },
                            {
                              'name': '',
                              'type': 'bytes32'
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
                          'name': 'getSubmissionListByAgencyId',
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
                          'name': 'getSubmissionListByUserId',
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
