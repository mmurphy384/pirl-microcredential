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
    public class GetUserByAddressQuery : IQuery<User>
    {
        public string Address { get; set; }
    }

    public class GetUserByAddressQueryHandler : IQueryHandler<GetUserByAddressQuery, User>
    {
        private readonly IUserRepository _userRepository;

        public GetUserByAddressQueryHandler(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public User Retrieve(GetUserByAddressQuery query)
        {
            return _userRepository.GetByAddress(query.Address);
        }
    }
}
