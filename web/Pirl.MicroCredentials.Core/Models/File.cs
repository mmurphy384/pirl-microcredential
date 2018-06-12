namespace Pirl.MicroCredentials.Core.Models
{
    public class File : BaseDomainModel<int>
    {
        public File(int id, string name, string url, string pirlFileHash, bool isActive, int userId, int userSubmissionId, int agencyId)
            : base(id)
        {
            Name = name;
            Url = url;
            PirlFileHash = pirlFileHash;
            IsActive = isActive;
            UserId = userId;
            UserSubmissionId = userSubmissionId;
            AgencyId = agencyId;
        }

        public string Name { get; private set; }
        public string Url { get; private set; }
        public string PirlFileHash { get; private set; }
        public bool IsActive { get; private set; }
        public int UserId { get; private set; }
        public int UserSubmissionId { get; private set; }
        public int AgencyId { get; private set; }
}