using Nethereum.ABI.FunctionEncoding.Attributes;

namespace Pirl.MicroCredentials.DbRead.DataModels
{
    [FunctionOutput]
    public class FileDataModel
    {
        [Parameter("uint256", 1)]
        public int Id { get; set; }
        [Parameter("bytes32", 2)]
        public string Name { get; set; }
        [Parameter("bytes32", 3)]
        public string Url { get; set; }
        [Parameter("bytes32", 4)]
        public string PirlFileHash { get; set; }
        [Parameter("bool", 5)]
        public bool IsActive { get; set; }
        [Parameter("uint256", 6)]
        public int UserId { get; set; }
        [Parameter("uint256", 7)]
        public int UserSubmissionId { get; set; }
        [Parameter("uint256", 8)]
        public int AgencyId { get; set; }
    }
}