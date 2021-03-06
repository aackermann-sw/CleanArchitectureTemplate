using Clean.Architecture.Application.Configurations;
using Clean.Architecture.Application.Interfaces;
using Clean.Architecture.Application.Interfaces.Repositories;
using Clean.Architecture.Application.Wrappers;
using Clean.Architecture.Infrastructure.Persistence.Contexts;
using Clean.Architecture.Infrastructure.Persistence.Identity;
using Clean.Architecture.Infrastructure.Persistence.Repositories;
using Clean.Architecture.Infrastructure.Persistence.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System;
using System.Text;

namespace Clean.Architecture.Infrastructure.Persistence.Extensions
{
    public static class ApiServiceCollectionExtension
    {
        public static void AddPersistenceInfrastructureForApi(this IServiceCollection services, IConfiguration configuration)
        {
#if (EnableMysqlSupport)
            services.AddDbContext<IdentityContext>(options => options.UseMySQL(configuration.GetConnectionString("DefaultConnection")));
            services.AddDbContext<ApplicationContext>(options => options.UseMySQL(configuration.GetConnectionString("DefaultConnection"),b => b.MigrationsAssembly(typeof(ApplicationContext).Assembly.FullName)));
#endif
#if (!EnableMysqlSupport)
            services.AddDbContext<IdentityContext>(options => options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));
            services.AddDbContext<ApplicationContext>(options => options.UseSqlServer(configuration.GetConnectionString("DefaultConnection"),b => b.MigrationsAssembly(typeof(ApplicationContext).Assembly.FullName)));
#endif
            services.AddIdentity<ApplicationUser, IdentityRole>().AddEntityFrameworkStores<IdentityContext>().AddDefaultTokenProviders();
            services.AddRepositories();
#region Services
            services.AddTransient<IAccountService, AccountService>();
#endregion
            services.Configure<JWTConfiguration>(configuration.GetSection("JWTConfiguration"));
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }) .AddJwtBearer(o =>
                {
                    o.RequireHttpsMetadata = false;
                    o.SaveToken = false;
                    o.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ClockSkew = TimeSpan.Zero,
                        ValidIssuer = configuration["JWTConfiguration:Issuer"],
                        ValidAudience = configuration["JWTConfiguration:Audience"],
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JWTConfiguration:Key"]))
                    };
                    o.Events = new JwtBearerEvents()
                    {
                        OnAuthenticationFailed = context =>
                        {
                            context.Response.StatusCode = 401;
                            context.Response.ContentType = "application/json";
                            var result = JsonConvert.SerializeObject(new Response<string>("the token is expired"));
                            return context.Response.WriteAsync(result);
                        },
                        OnChallenge = context =>
                        {
                            context.HandleResponse();
                            context.Response.StatusCode = 401;
                            context.Response.ContentType = "application/json";
                            var result = JsonConvert.SerializeObject(new Response<string>("You are not Authorized"));
                            return context.Response.WriteAsync(result);
                        },
                        OnForbidden = context =>
                        {
                            context.Response.StatusCode = 403;
                            context.Response.ContentType = "application/json";
                            var result = JsonConvert.SerializeObject(new Response<string>("You are not authorized to access this resource"));
                            return context.Response.WriteAsync(result);
                        }
                    };
                });

        }
    }
}
