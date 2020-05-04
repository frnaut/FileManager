using FilesManager.Core.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace FilesManager.Core.IRepository
{
    public interface ISearchPersonalRepository<T>
    {
        Task<T> SearchPersonalIdentification(string identification);
    }
}
