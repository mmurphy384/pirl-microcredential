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
    public class GetUsersQuery : IQuery<User[]>
    {
    }

    public class GetUsersQueryHandler : IQueryHandler<GetUsersQuery, User[]>
    {
        private readonly IUserRepository _userRepository;

        public GetUsersQueryHandler(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public User[] Retrieve(GetUsersQuery query)
        {
            return _userRepository.GetAll().ToArray();
        }
    }
}
