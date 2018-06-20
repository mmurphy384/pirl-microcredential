using Nethereum.ABI.FunctionEncoding.Attributes;

namespace Pirl.MicroCredentials.DbRead.DataModels
{
    [FunctionOutput]
    public class UserSubmissionDataModel
    {
        [Parameter("uint256", 1)]
        public int Id { get; set; }
        [Parameter("uint256", 2)]
        public int UserId { get; set; }
        [Parameter("uint256", 3)]
        public int AgencyId { get; set; }
        [Parameter("uint256", 4)]
        public int CredentialId { get; set; }
        [Parameter("bytes32", 5)]
        public string FileIds { get; set; }
        [Parameter("bytes32", 6)]
        public string Status { get; set; }
    }
}