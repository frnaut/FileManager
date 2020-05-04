using FilesManager.Core.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace FilesManager.Core.IRepository
{
    public interface IMethodsRepository<T> where T : BaseEntity
    {
        Task<List<T>> GetAllAsync();
        Task<T> GetById(int id);
        Task<T> PostAsync(T model);
        void Put(T model);
        Task<T> DeleteAsync(int id);
        Task SaveAsync();
    }
}
