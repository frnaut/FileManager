using FilesManager.Core.DbContext;
using FilesManager.Core.IRepository;
using FilesManager.Core.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FilesManager.Data.Repository
{
    public class SearchPersonalRepository<T> : ISearchPersonalRepository<T> where T: PersonalModel
    {
        private readonly AppDbContext _appDbContext;

        public SearchPersonalRepository(AppDbContext appDbContext)
        {
            this._appDbContext = appDbContext;
        }
    

        public async Task<T> SearchPersonalIdentification(string identification)
        {
            var model = await _appDbContext.Set<T>().Include(x => x.Documents).FirstOrDefaultAsync(x => x.Identification == identification);
            if (model == null) { return null; }
            return model;
        }

        
    }
}
