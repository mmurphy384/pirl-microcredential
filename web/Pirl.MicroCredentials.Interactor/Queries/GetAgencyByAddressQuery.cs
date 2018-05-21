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
    public class GetAgencyByAddressQuery : IQuery<Agency>
    {
        public string Address { get; set; }
    }

    public class GetAgencyByAddressQueryHandler : IQueryHandler<GetAgencyByAddressQuery, Agency>
    {
        private readonly IAgencyRepository _agencyRepository;

        public GetAgencyByAddressQueryHandler(IAgencyRepository agencyRepository)
        {
            _agencyRepository = agencyRepository;
        }

        public Agency Retrieve(GetAgencyByAddressQuery query)
        {
            return _agencyRepository.GetByAddress(query.Address);
        }
    }
}
