using System;
using System.Collections.Generic;
using System.Text;

namespace FilesManager.Core.Requets
{
    public class DocumentRequest
    {
        public string Name { get; set; }
        public string Format { get; set; }
        public string Document { get; set; }
        public int PersonalId { get; set; }
    }
}
