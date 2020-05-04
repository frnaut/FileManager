using FilesManager.Core.DbContext;
using FilesManager.Core.IRepository;
using FilesManager.Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace FilesManager.Data.Repository
{
    public class MethodsRepository<T> : IMethodsRepository<T> where T : BaseEntity
    {
        private readonly AppDbContext _appDbContext;

        public MethodsRepository(AppDbContext appDbContext)
        {
            this._appDbContext = appDbContext;
        }

        public async Task<T> DeleteAsync(int id)
        {
            var model = await GetById(id);
            _appDbContext.Remove(model);
            await SaveAsync();
            return model;
        }

        public async Task<List<T>> GetAllAsync()
        {
            return await _appDbContext.Set<T>().ToListAsync();
        }

        public async Task<T> GetById(int id)
        {
            return await _appDbContext.Set<T>().FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<T> PostAsync(T model)
        {
            var newModel = await _appDbContext.Set<T>().AddAsync(model);
            await SaveAsync();
            return newModel.Entity;
        }

        public void Put(T model)
        {
            try
            {
                EntityEntry entity = _appDbContext.Entry(model);
                entity.State = EntityState.Modified;
                _appDbContext.SaveChanges();
            }
            catch(Exception ex)
            {
                ex.ToString();
            }
        }

        public async Task SaveAsync()
        {
          await _appDbContext.SaveChangesAsync();
        }
    }
}
