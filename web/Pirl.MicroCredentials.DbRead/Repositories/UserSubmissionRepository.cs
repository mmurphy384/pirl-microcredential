using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Nethereum.Contracts;
using Nethereum.Web3;
using Pirl.MicroCredentials.Core.Contracts.Interfaces;
using Pirl.MicroCredentials.Core.Models;
using Pirl.MicroCredentials.Core.Repositories.Interfaces;
using Pirl.MicroCredentials.DbRead.DataModels;
using Pirl.MicroCredentials.Interactor.Mappings.Interfaces;

namespace Pirl.MicroCredentials.DbRead.Repositories
{
    public class UserSubmissionRepository : IUserSubmissionRepository
    {
        private readonly Web3 _web3;
        private readonly IMappingProcessor _mappingProcessor;
        private readonly Contract _contract;

        public UserSubmissionRepository(IMappingProcessor mappingProcessor, IUserSubmissionsContract userSubmissionsContract, Web3 web3)
        {
            _web3 = web3;
            _mappingProcessor = mappingProcessor;
            _contract = web3.Eth.GetContract(userSubmissionsContract.GetContractAbi(), userSubmissionsContract.GetContractAddress());
        }

        public UserSubmission GetById(int id)
        {
            var userSubmissionDataModel = _contract.GetFunction("getSubmissionById").CallDeserializingToObjectAsync<UserSubmissionDataModel>(id).Result;

            return _mappingProcessor.Map<UserSubmissionDataModel, UserSubmission>(userSubmissionDataModel);
        }

        public IEnumerable<UserSubmission> GetAll()
        {
            throw new NotImplementedException();
        }
    }
}
