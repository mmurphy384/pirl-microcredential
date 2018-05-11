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
    public class UserApiController : ApiController
    {
        private readonly IQueryProcessor _queryProcessor;
        private readonly IMappingProcessor _mappingProcessor;

        public UserApiController(IQueryProcessor queryProcessor, IMappingProcessor mappingProcessor)
        {
            _queryProcessor = queryProcessor;
            _mappingProcessor = mappingProcessor;
        }

        // GET Api/UserApi
        public UserViewModel[] GetUsers()
        {
            var users = _queryProcessor.Retrieve<GetUsersQuery, User[]>(new GetUsersQuery());

            var userViewModels = users.Select(
                dto => _mappingProcessor.Map<User, UserViewModel>(dto)
            );

            return userViewModels.ToArray();
        }

        // GET Api/UserApi/1
        public UserViewModel GetUser(int id)
        {
            var getUserQuery = new GetUserQuery
            {
                Id = id
            };

            var user = _queryProcessor.Retrieve<GetUserQuery, User>(getUserQuery);

            return _mappingProcessor.Map<User, UserViewModel>(user);
        }
    }
}