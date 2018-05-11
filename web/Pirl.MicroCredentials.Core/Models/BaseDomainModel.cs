using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Pirl.MicroCredentials.Core.Models
{
    public abstract class BaseDomainModel<TId>
    {
        internal BaseDomainModel(TId id)
        {
            Id = id;
        }

        public virtual TId Id { get; private set; }
    }
}
