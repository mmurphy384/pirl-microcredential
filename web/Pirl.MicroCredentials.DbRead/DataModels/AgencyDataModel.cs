using Nethereum.ABI.FunctionEncoding.Attributes;

namespace Pirl.MicroCredentials.DbRead.DataModels
{
    [FunctionOutput]
    public class AgencyDataModel
    {
        [Parameter("uint", "id", 7)]
        public int Id { get; set; }
        [Parameter("bytes32", "agencyName", 1)]
        public string AgencyName { get; set; }
        [Parameter("bytes32", "firstName", 3)]
        public string FirstName { get; set; }
        [Parameter("bytes32", "lastName", 4)]
        public string LastName { get; set; }
        [Parameter("bytes32", "email", 5)]
        public string Email { get; set; }
        [Parameter("bytes32", "website", 2)]
        public string Website { get; set; }
    }
}