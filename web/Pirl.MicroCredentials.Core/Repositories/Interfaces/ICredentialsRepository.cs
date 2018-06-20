using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Pirl.MicroCredentials.Core.Models;

namespace Pirl.MicroCredentials.Core.Repositories.Interfaces
{
    public interface ICredentialsRepository : IRepository<Credential, int>
    {
        Credential[] GetByAgency(int agencyId);
    }
}
