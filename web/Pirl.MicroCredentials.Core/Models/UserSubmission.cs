using System;

namespace Pirl.MicroCredentials.Core.Models
{
    public class UserSubmission : BaseDomainModel<int>
    {
        public UserSubmission(int id, int userId, int agencyId, int credentialId, string fileIds, string status)
            : base(id)
        {
            UserId = userId;
            AgencyId = agencyId;
            CredentialId = credentialId;
            FileIds = fileIds;
            Status = status;
        }

        public int UserId { get; private set; }
        public int AgencyId { get; private set; }
        public int CredentialId { get; private set; }
        public string FileIds { get; private set; }
        public string Status { get; private set; }
    }
}