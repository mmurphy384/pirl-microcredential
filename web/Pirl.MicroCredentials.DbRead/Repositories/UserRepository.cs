﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Pirl.MicroCredentials.Core.Contracts.Interfaces;
using Pirl.MicroCredentials.Core.Models;
using Pirl.MicroCredentials.Core.Repositories.Interfaces;

namespace Pirl.MicroCredentials.DbRead.Repositories
{
    public class UserRepository : IUserRepository
    {
        private IUserContract _userContract;

        public UserRepository(IUserContract userContract)
        {
            _userContract = userContract;
        }

        public User GetById(int id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<User> GetAll()
        {
            throw new NotImplementedException();
        }
    }
}
