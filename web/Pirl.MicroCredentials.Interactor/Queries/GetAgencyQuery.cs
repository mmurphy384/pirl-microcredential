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
    public class GetAgencyQuery : IQuery<Agency>
    {
        public int Id { get; set; }
    }

    public class GetAgencyQueryHandler : IQueryHandler<GetAgencyQuery, Agency>
    {
        private readonly IAgencyRepository _agencyRepository;

        public GetAgencyQueryHandler(IAgencyRepository agencyRepository)
        {
            _agencyRepository = agencyRepository;
        }

        public Agency Retrieve(GetAgencyQuery query)
        {
            return _agencyRepository.GetById(query.Id);
        }
    }
}
