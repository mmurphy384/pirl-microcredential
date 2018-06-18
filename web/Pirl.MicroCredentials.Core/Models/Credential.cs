using System;

namespace Pirl.MicroCredentials.Core.Models
{
    public class Credential : BaseDomainModel<int>
    {
        public Credential(int id, string name, string url, bool isActive, int fee, int agencyId)
            : base(id)
        {
            Name = name;
            Url = url;
            IsActive = isActive;
            Fee = fee;
            AgencyId = agencyId;
        }

        public string Name { get; private set; }
        public string Url { get; private set; }
        public bool IsActive { get; private set; }
        public int Fee { get; private set; }
        public int AgencyId { get; private set; }
    }
}