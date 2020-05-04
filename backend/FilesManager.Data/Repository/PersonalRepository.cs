using FilesManager.Core.DbContext;
using FilesManager.Core.IRepository;
using FilesManager.Core.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Linq;

namespace FilesManager.Data.Repository
{
    public class PersonalRepository : MethodsRepository<PersonalModel>, IPersonalRepository
    {
        private readonly AppDbContext appDbContext;

        public PersonalRepository(AppDbContext appDbContext) : base(appDbContext)
        {
            this.appDbContext = appDbContext;
        }

        public async Task<List<PersonalModel>> GetAllWithDocuments()
        {
            return await appDbContext.Personal.Include(x => x.Documents)
                .OrderBy(x => x.Created).ToListAsync();
            
        }

        public async Task<PersonalModel> GetByIdWithDocuments( int id )
        {
            return await appDbContext.Personal.Include(x => x.Documents)
                                            .FirstOrDefaultAsync(x => x.Id == id);
            
        }
    }
}
