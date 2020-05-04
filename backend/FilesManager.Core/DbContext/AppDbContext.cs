using FilesManager.Core.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace FilesManager.Core.DbContext
{
    public class AppDbContext : IdentityDbContext<AppUser>
    {
        public AppDbContext(DbContextOptions options ) : base(options)
        {

        }

        #region DbSet
        public DbSet<DocumentModel> Documents { get; set; }
        public DbSet<PersonalModel> Personal { get; set; }
        #endregion  

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<PersonalModel>().Property(x => x.Created)
                                            .HasDefaultValue(DateTime.Now);

            builder.Entity<DocumentModel>().Property(x => x.Created)
                                            .HasDefaultValue(DateTime.Now);
            
        }
    }
}
