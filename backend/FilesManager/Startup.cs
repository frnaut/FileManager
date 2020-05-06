using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FilesManager.Core.DbContext;
using FilesManager.Core.IRepository;
using FilesManager.Core.Managers;
using FilesManager.Core.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using FilesManager.Data.Repository;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace FilesManager
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();

            #region DbContext, Roles
            services.AddIdentity<AppUser, IdentityRole>()
                    .AddEntityFrameworkStores<AppDbContext>()
                    .AddDefaultTokenProviders();

            
            services.AddDbContext<AppDbContext>(options =>
            options.UseSqlServer("data source = SQL5047.site4now.net; initial catalog = DB_A5E587_FileManager; user id = DB_A5E587_FileManager_admin; password = 6366aaee36"));

            #endregion

            #region Dependency injection
            services.AddTransient<PersonalManager, PersonalManager>();
            services.AddTransient<DocumentManager, DocumentManager>();
            services.AddScoped<IPersonalRepository, PersonalRepository>();
            services.AddScoped<IDocumentRepository, DocumentRepository>();
            services.AddScoped<IUploadFileRepository, UploadFileRepository>();
            services.AddScoped<ISearchPersonalRepository<PersonalModel>, SearchPersonalRepository<PersonalModel>>();
            #endregion

            #region Token
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                    .AddJwtBearer(options => options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = false,
                        ValidateAudience = false,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(
                            Encoding.UTF8.GetBytes(Configuration["JWT:KEY"])),
                        ClockSkew = TimeSpan.Zero 
                    });
            #endregion

            services.AddControllersWithViews()
                 .AddNewtonsoftJson(options => options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);
        }

        

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors(builder => builder.AllowAnyOrigin()
                                          .AllowAnyMethod()
                                           .AllowAnyHeader());

            app.UseAuthorization();
            app.UseStaticFiles();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
