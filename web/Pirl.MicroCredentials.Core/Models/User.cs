namespace Pirl.MicroCredentials.Core.Models
{
    public class User : BaseDomainModel<int>
    {
        public User(int id, string firstName, string lastName, string email)
            : base(id)
        {
            FirstName = firstName;
            LastName = lastName;
            Email = email;
        }

        public string FirstName { get; private set; }
        public string LastName { get; private set; }
        public string Email { get; private set; }
    }
}