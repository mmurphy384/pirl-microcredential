using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Pirl.MicroCredentials.Models
{
    public class UserSubmissionViewModel
    {
        public int? Id { get; set; }

        [Required]
        public int UserId { get; private set; }
        [Required]
        public int AgencyId { get; private set; }
        [Required]
        public int CredentialId { get; private set; }
        [Required]
        public string FileIds { get; private set; }
        [Required]
        public string Status { get; private set; }
    }
}