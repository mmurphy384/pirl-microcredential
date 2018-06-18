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
    public class CredentialApiController : ApiController
    {
        private readonly IQueryProcessor _queryProcessor;
        private readonly IMappingProcessor _mappingProcessor;

        public CredentialApiController(IQueryProcessor queryProcessor, IMappingProcessor mappingProcessor)
        {
            _queryProcessor = queryProcessor;
            _mappingProcessor = mappingProcessor;
        }

        // GET Api/AgencyApi
        public CredentialViewModel[] GetByAgency(int agencyId)
        {
            var getCredentialsByAgencyQuery = new GetCredentialsByAgencyQuery
            {
                AgencyId = agencyId
            };

            var credentials = _queryProcessor.Retrieve<GetCredentialsByAgencyQuery, Credential[]>(getCredentialsByAgencyQuery);

            var credentialViewModels = credentials.Select(
                dto => _mappingProcessor.Map<Credential, CredentialViewModel>(dto)
            );

            return credentialViewModels.ToArray();
        }
    }
}