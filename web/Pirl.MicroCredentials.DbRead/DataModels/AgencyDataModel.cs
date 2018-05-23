using Nethereum.ABI.FunctionEncoding.Attributes;

namespace Pirl.MicroCredentials.DbRead.DataModels
{
    [FunctionOutput]
    public class AgencyDataModel
    {
        [Parameter("uint256", 7)]
        public int Id { get; set; }
        [Parameter("bytes32", 1)]
        public string AgencyName { get; set; }
        [Parameter("bytes32", 3)]
        public string FirstName { get; set; }
        [Parameter("bytes32", 4)]
        public string LastName { get; set; }
        [Parameter("bytes32", 5)]
        public string Email { get; set; }
        [Parameter("bytes32", 2)]
        public string Website { get; set; }
    }
}