using Clean.Architecture.Application.Configurations;
using Clean.Architecture.Application.Constants;
using Clean.Architecture.Application.Constants.Permissions;
using Clean.Architecture.Infrastructure.Persistence.Contexts;
using Clean.Architecture.Infrastructure.Persistence.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Clean.Architecture.Infrastructure.Persistence.Extensions
{
    public static class WebServiceCollectionExtension
    {
        public static void AddPersistenceInfrastructureForWeb(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddPersistenceContexts(configuration);
            services.AddRepositories();
            services.Configure<CacheConfiguration>(configuration.GetSection("CacheConfiguration"));
        }
        public static void AddAuthenticationSchemeForWeb(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddMvc(o =>
            {
                //Add Authentication to all Controllers by default.
                var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
                o.Filters.Add(new AuthorizeFilter(policy));
            });
            services.AddAuthorization(options =>
            {
                options.AddPolicy(MasterPermissions.Create, policy => { policy.RequireClaim(CustomClaimTypes.Permission, MasterPermissions.Create); });
                options.AddPolicy(MasterPermissions.Update, policy => { policy.RequireClaim(CustomClaimTypes.Permission, MasterPermissions.Update); });
                options.AddPolicy(MasterPermissions.Delete, policy => { policy.RequireClaim(CustomClaimTypes.Permission, MasterPermissions.Delete) ; });
            });
        }
        private static void AddPersistenceContexts(this IServiceCollection services, IConfiguration configuration)
        {
            
            services.AddIdentity<ApplicationUser, IdentityRole>(options =>
            {
                options.SignIn.RequireConfirmedAccount = true;
                options.Password.RequireNonAlphanumeric = false;
            }).AddEntityFrameworkStores<IdentityContext>().AddDefaultUI().AddDefaultTokenProviders();
#if (EnableMysqlSupport)
            services.AddDbContext<IdentityContext>(options => options.UseMySQL (configuration.GetConnectionString("DefaultConnection")));
            services.AddDbContext<ApplicationContext>(options => options.UseMySQL( configuration.GetConnectionString("DefaultConnection"), b => b.MigrationsAssembly(typeof(ApplicationContext).Assembly.FullName)));
#endif
#if (!EnableMysqlSupport)
            services.AddDbContext<IdentityContext>(options => options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));
            services.AddDbContext<ApplicationContext>(options => options.UseSqlServer( configuration.GetConnectionString("DefaultConnection"), b => b.MigrationsAssembly(typeof(ApplicationContext).Assembly.FullName)));
#endif
        }
    }
}
