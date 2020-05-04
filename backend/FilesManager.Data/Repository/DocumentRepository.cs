using FilesManager.Core.DbContext;
using FilesManager.Core.IRepository;
using FilesManager.Core.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace FilesManager.Data.Repository
{
    public class DocumentRepository : MethodsRepository<DocumentModel>, IDocumentRepository
    {
        public DocumentRepository(AppDbContext appDbContext) : base(appDbContext)
        {
        }
    }
}
