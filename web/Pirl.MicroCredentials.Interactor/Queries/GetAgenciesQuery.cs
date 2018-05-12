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
    public class GetAgenciesQuery : IQuery<Agency[]>
    {
    }

    public class GetAgenciesQueryHandler : IQueryHandler<GetAgenciesQuery, Agency[]>
    {
        private readonly IAgencyRepository _agencyRepository;

        public GetAgenciesQueryHandler(IAgencyRepository agencyRepository)
        {
            _agencyRepository = agencyRepository;
        }

        public Agency[] Retrieve(GetAgenciesQuery query)
        {
            return _agencyRepository.GetAll().ToArray();
        }
    }
}
