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
        [DisplayName("Name")]
        public string Name { get; set; }

        [Required]
        [DisplayName("First Name")]
        public string ContactFirstName { get; set; }

        [Required]
        [DisplayName("Last Name")]
        public string ContactLastName { get; set; }
    }
}