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
    public class UserSubmissionApiController : ApiController
    {
        private readonly IQueryProcessor _queryProcessor;
        private readonly IMappingProcessor _mappingProcessor;

        public UserSubmissionApiController(IQueryProcessor queryProcessor, IMappingProcessor mappingProcessor)
        {
            _queryProcessor = queryProcessor;
            _mappingProcessor = mappingProcessor;
        }

        // GET Api/FileApi/1
        public UserSubmissionViewModel GetSubmissionById(int id)
        {
            var getSubmissionById = new GetSubmissionByIdQuery
            {
                Id = id
            };

            var userSubmission = _queryProcessor.Retrieve<GetSubmissionByIdQuery, UserSubmission>(getSubmissionById);

            return _mappingProcessor.Map<UserSubmission, UserSubmissionViewModel>(userSubmission);
        }
    }
}