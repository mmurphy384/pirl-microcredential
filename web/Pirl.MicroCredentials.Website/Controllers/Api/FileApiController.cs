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
    public class FileApiController : ApiController
    {
        private readonly IQueryProcessor _queryProcessor;
        private readonly IMappingProcessor _mappingProcessor;

        public FileApiController(IQueryProcessor queryProcessor, IMappingProcessor mappingProcessor)
        {
            _queryProcessor = queryProcessor;
            _mappingProcessor = mappingProcessor;
        }

        // GET Api/FileApi/1
        public FileViewModel GetFileById(int id)
        {
            var getFileById = new GetFileByIdQuery
            {
                Id = id
            };

            var file = _queryProcessor.Retrieve<GetFileByIdQuery, File>(getFileById);

            return _mappingProcessor.Map<File, FileViewModel>(file);
        }
    }
}