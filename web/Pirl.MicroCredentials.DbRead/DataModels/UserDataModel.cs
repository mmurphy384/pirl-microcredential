using Nethereum.ABI.FunctionEncoding.Attributes;

namespace Pirl.MicroCredentials.DbRead.DataModels
{
    [FunctionOutput]
    public class UserDataModel
    {
        [Parameter("uint", "id", 5)]
        public int Id { get; set; }
        [Parameter("bytes32", "firstName")]
        public string FirstName { get; set; }
        [Parameter("bytes32", "lastName", 2)]
        public string LastName { get; set; }
        [Parameter("bytes32", "email", 3)]
        public string Email { get; set; }
    }
}