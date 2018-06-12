using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Pirl.MicroCredentials.Models
{
    public class FileViewModel
    {
        public int? Id { get; set; }

        [Required]
        [DisplayName("File Name")]
        public string Name { get; set; }
        [Required]
        public string Url { get; set; }
        [Required]
        [DisplayName("Pirl File Hash")]
        public string PirlFileHash { get; set; }
        public bool IsActive { get; set; }
        [Required]
        public int UserId { get; set; }
        [Required]
        public int UserSubmissionId { get; set; }
        [Required]
        public int AgencyId { get; set; }
    }
}