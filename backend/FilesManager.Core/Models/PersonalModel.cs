using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace FilesManager.Core.Models
{
    public class PersonalModel : BaseEntity
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public string Identification { get; set; }
        [Required]
        public string ProfileImage { get; set; }
        public List<DocumentModel> Documents { get; set; }
        public DateTime Created { get; set; }

    }
}
