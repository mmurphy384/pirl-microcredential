using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using Pirl.MicroCredentials.Core.Models;
using Pirl.MicroCredentials.Interactor.Mappings.Interfaces;
using Pirl.MicroCredentials.Interactor.Queries;
using Pirl.MicroCredentials.Interactor.Queries.Interfaces;
using Pirl.MicroCredentials.Models;

namespace Pirl.MicroCredentials.Controllers.Api
{
    public class AgencyApiController : ApiController
    {
        private readonly IQueryProcessor _queryProcessor;
        private readonly IMappingProcessor _mappingProcessor;

        public AgencyApiController(IQueryProcessor queryProcessor, IMappingProcessor mappingProcessor)
        {
            _queryProcessor = queryProcessor;
            _mappingProcessor = mappingProcessor;
        }

        // GET Api/AgencyApi
        public AgencyViewModel[] GetAgencies()
        {
            var agencies = _queryProcessor.Retrieve<GetAgenciesQuery, Agency[]>(new GetAgenciesQuery());

            var agencyViewModels = agencies.Select(
                dto => _mappingProcessor.Map<Agency, AgencyViewModel>(dto)
            );

            return agencyViewModels.ToArray();
        }

        // GET Api/AgencyApi/1
        public AgencyViewModel GetAgency(int id)
        {
            var getAgencyQuery = new GetAgencyQuery
            {
                Id = id
            };

            var agency = _queryProcessor.Retrieve<GetAgencyQuery, Agency>(getAgencyQuery);

            return _mappingProcessor.Map<Agency, AgencyViewModel>(agency);
        }
    }
}