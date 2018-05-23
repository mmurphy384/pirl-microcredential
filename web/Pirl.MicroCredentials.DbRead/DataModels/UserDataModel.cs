using Nethereum.ABI.FunctionEncoding.Attributes;

namespace Pirl.MicroCredentials.DbRead.DataModels
{
    [FunctionOutput]
    public class UserDataModel
    {
        [Parameter("uint256", 5)]
        public int Id { get; set; }
        [Parameter("bytes32",  1)]
        public string FirstName { get; set; }
        [Parameter("bytes32",  2)]
        public string LastName { get; set; }
        [Parameter("bytes32",  3)]
        public string Email { get; set; }
    }
}