using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Pirl.MicroCredentials.Models
{
    public class CredentialViewModel
    {
        public int? Id { get; set; }

        [Required]
        [DisplayName("Credential Name")]
        public string Name { get; set; }

        [Required]
        [DisplayName("Url")]
        public string Url { get; set; }

        [DisplayName("Is Active")]
        public bool IsActive { get; set; }

        [DisplayName("Fee")]
        public int Fee { get; set; }

        [DisplayName("Agency")]
        public int AgencyId { get; set; }
    }
}