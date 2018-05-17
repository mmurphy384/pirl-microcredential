using System;

namespace Pirl.MicroCredentials.Core.Models
{
    public class Agency : BaseDomainModel<int>
    {
        public Agency(int id, string agencyName, string firstName, string lastName, string email, string website)
            : base(id)
        {
            AgencyName = agencyName;
            FirstName = firstName;
            LastName = lastName;
            Email = email;
            Website = website;
        }

        public string AgencyName { get; private set; }
        public string FirstName { get; private set; }
        public string LastName { get; private set; }
        public string Email { get; private set; }
        public string Website { get; private set; }
    }
}