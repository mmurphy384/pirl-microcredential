namespace Pirl.MicroCredentials.Core.Models
{
    public class User : BaseDomainModel<int>
    {
        public User(int id, string firstName, string lastName)
            : base(id)
        {
            FirstName = firstName;
            LastName = lastName;
        }

        public string FirstName { get; private set; }
        public string LastName { get; private set; }
    }
}