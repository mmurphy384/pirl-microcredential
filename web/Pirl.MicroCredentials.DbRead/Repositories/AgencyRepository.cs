using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Pirl.MicroCredentials.Core.Contracts.Interfaces;
using Pirl.MicroCredentials.Core.Models;
using Pirl.MicroCredentials.Core.Repositories.Interfaces;

namespace Pirl.MicroCredentials.DbRead.Repositories
{
    public class AgencyRepository : IAgencyRepository
    {
        private IMicroCredentialContract _microCredentialContract;

        public AgencyRepository(IMicroCredentialContract microCredentialContract)
        {
            _microCredentialContract = microCredentialContract;
        }

        public Agency GetById(int id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Agency> GetAll()
        {
            throw new NotImplementedException();
        }
    }
}
