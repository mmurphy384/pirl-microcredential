using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Pirl.MicroCredentials.Models
{
    public class AgencyViewModel
    {
        public int? Id { get; set; }

        [Required]
        [DisplayName("Agency Name")]
        public string AgencyName { get; set; }

        [Required]
        [DisplayName("First Name")]
        public string FirstName { get; set; }

        [Required]
        [DisplayName("Last Name")]
        public string LastName { get; set; }

        [DisplayName("Email")]
        public string Email { get; set; }

        [DisplayName("Website")]
        public string Website { get; set; }
    }
}