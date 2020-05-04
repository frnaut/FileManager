using FilesManager.Core.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace FilesManager.Core.IRepository
{
    public interface IPersonalRepository : IMethodsRepository<PersonalModel>
    {
        Task<List<PersonalModel>> GetAllWithDocuments();
        Task<PersonalModel> GetByIdWithDocuments(int id);
    }
}
