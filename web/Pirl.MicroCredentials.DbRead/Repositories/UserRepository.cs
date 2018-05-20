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
    public class UserRepository : IUserRepository
    {
        private readonly Web3 _web3;
        private readonly IMappingProcessor _mappingProcessor;
        private readonly Contract _contract;

        public UserRepository(IMappingProcessor mappingProcessor, IUserContract userContract, Web3 web3)
        {
            _web3 = web3;
            _mappingProcessor = mappingProcessor;
            _contract = web3.Eth.GetContract(userContract.GetContractAbi(), userContract.GetContractAddress());
        }

        public User GetById(int id)
        {
            var userDataModel = _contract.GetFunction("getUserById").CallDeserializingToObjectAsync<UserDataModel>(id).Result;

            return _mappingProcessor.Map<UserDataModel, User>(userDataModel);
        }

        public User GetByAddress(string address)
        {
            var userDataModel = _contract.GetFunction("getUserByAddress").CallDeserializingToObjectAsync<UserDataModel>(address).Result;

            return _mappingProcessor.Map<UserDataModel, User>(userDataModel);
        }

        public IEnumerable<User> GetAll()
        {
            throw new NotImplementedException();
        }
    }
}
