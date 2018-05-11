using System;

namespace Pirl.MicroCredentials.Core.Models
{
    public class Agency : BaseDomainModel<int>
    {
        public Agency(int id, string name, string contactFirstName, string contactLastName)
            : base(id)
        {
            Name = name;
            ContactFirstName = contactFirstName;
            ContactLastName = contactLastName;
        }

        public string Name { get; private set; }
        public string ContactFirstName { get; private set; }
        public string ContactLastName { get; private set; }
    }
}