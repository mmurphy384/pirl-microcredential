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
    public class CredentialsRepository : ICredentialsRepository
    {
        private readonly Web3 _web3;
        private readonly IMappingProcessor _mappingProcessor;
        private readonly Contract _contract;

        public CredentialsRepository(IMappingProcessor mappingProcessor, ICredentialsContract credentialsContract, Web3 web3)
        {
            _web3 = web3;
            _mappingProcessor = mappingProcessor;
            _contract = web3.Eth.GetContract(credentialsContract.GetContractAbi(), credentialsContract.GetContractAddress());
        }

        public Credential[] GetByAgency(int id)
        {
            throw new NotImplementedException();
        }

        public Credential GetById(int id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Credential> GetAll()
        {
            throw new NotImplementedException();
        }
    }
}
