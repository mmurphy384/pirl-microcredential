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
    public class AgencyRepository : IAgencyRepository
    {
        private readonly Web3 _web3;
        private readonly IMappingProcessor _mappingProcessor;
        private readonly Contract _contract;

        public AgencyRepository(IMappingProcessor mappingProcessor, IMicroCredentialContract microCredentialContract, Web3 web3)
        {
            _web3 = web3;
            _mappingProcessor = mappingProcessor;
            _contract = web3.Eth.GetContract(microCredentialContract.GetContractAbi(), microCredentialContract.GetContractAddress());
        }

        public Agency GetById(int id)
        {
            var agencyDataModel = _contract.GetFunction("getAgencyInfoById").CallDeserializingToObjectAsync<AgencyDataModel>(id).Result;

            return _mappingProcessor.Map<AgencyDataModel, Agency>(agencyDataModel);
        }

        public Agency GetByAddress(string address)
        {
            var agencyDataModel = _contract.GetFunction("getAgencyInfoByAddress").CallDeserializingToObjectAsync<AgencyDataModel>(address).Result;

            return _mappingProcessor.Map<AgencyDataModel, Agency> (agencyDataModel);
        }

        public IEnumerable<Agency> GetAll()
        {
            throw new NotImplementedException();
        }
    }
}
