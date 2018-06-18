using Nethereum.ABI.FunctionEncoding.Attributes;

namespace Pirl.MicroCredentials.DbRead.DataModels
{
    [FunctionOutput]
    public class CredentialsDataModel
    {
        [Parameter("uint256[]", 7)]
        public int Id { get; set; }
        [Parameter("bytes32[]", 1)]
        public string Name { get; set; }
    }
}