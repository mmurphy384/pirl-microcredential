using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Pirl.MicroCredentials.Core.Models;
using Pirl.MicroCredentials.Core.Repositories.Interfaces;
using Pirl.MicroCredentials.Interactor.Mappings.Interfaces;
using Pirl.MicroCredentials.Interactor.Queries.Interfaces;

namespace Pirl.MicroCredentials.Interactor.Queries
{
    public class GetCredentialsByAgencyQuery : IQuery<Credential[]>
    {
        public int AgencyId { get; set; }
    }

    public class GetCredentialsByAgencyQueryHandler : IQueryHandler<GetCredentialsByAgencyQuery, Credential[]>
    {
        private readonly ICredentialsRepository _credentialsRepository;

        public GetCredentialsByAgencyQueryHandler(ICredentialsRepository credentialsRepository)
        {
            _credentialsRepository = credentialsRepository;
        }

        public Credential[] Retrieve(GetCredentialsByAgencyQuery query)
        {
            return _credentialsRepository.GetByAgency(query.AgencyId);
        }
    }
}
