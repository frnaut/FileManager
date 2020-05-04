using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace FilesManager.Core.Models
{
    public class DocumentModel : BaseEntity
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string format { get; set; }
        [Required]
        public string path { get; set; }
        [Required]
        public int PersonalId { get; set; }
        public PersonalModel Personal { get; set; }
        public DateTime Created { get; set; }

    }
}
