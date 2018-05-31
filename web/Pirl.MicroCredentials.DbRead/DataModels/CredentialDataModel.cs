using Nethereum.ABI.FunctionEncoding.Attributes;

namespace Pirl.MicroCredentials.DbRead.DataModels
{
    [FunctionOutput]
    public class CredentialDataModel
    {
        [Parameter("uint256", 7)]
        public int Id { get; set; }
        [Parameter("bytes32", 1)]
        public string Name { get; set; }
        [Parameter("bytes32", 3)]
        public string Url { get; set; }
        [Parameter("bool", 4)]
        public bool IsActive { get; set; }
        [Parameter("uint256", 5)]
        public int Fee { get; set; }
        [Parameter("uint256", 2)]
        public int AgencyId { get; set; }
    }
}