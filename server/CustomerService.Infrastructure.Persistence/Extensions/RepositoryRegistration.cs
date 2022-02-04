﻿using Tsp.CustomerService.Application.Interfaces.Repositories;
using Tsp.CustomerService.Infrastructure.Persistence.Repositories;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Tsp.CustomerService.Infrastructure.Persistence.Contexts;
using Microsoft.EntityFrameworkCore;
using Tsp.CustomerService.Infrastructure.Persistence.Seeds;
using Microsoft.AspNetCore.Identity;
using Tsp.CustomerService.Infrastructure.Persistence.Identity;

namespace Tsp.CustomerService.Infrastructure.Persistence.Extensions
{
    public static class RepositoryRegistration
    {
        public static void AddRepositories(this IServiceCollection services)
        {
            #region Repositories
            services.AddTransient(typeof(IGenericRepositoryAsync<>), typeof(GenericRepositoryAsync<>));
            services.AddTransient<IProductRepositoryAsync, ProductRepositoryAsync>();
            services.AddTransient<IUnitOfWork, UnitOfWork>();
            #endregion
        }

        public static async Task ApplyMigrations(this IServiceProvider services)
        {
            using var scope = services.CreateScope();

            await using ApplicationContext appDbContext = scope.ServiceProvider.GetRequiredService<ApplicationContext>();
            await using IdentityContext identityDbContext = scope.ServiceProvider.GetRequiredService<IdentityContext>();
            using UserManager<ApplicationUser> userManager = scope.ServiceProvider.GetRequiredService<UserManager<ApplicationUser>>();
            using RoleManager<IdentityRole> rolManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();

            await appDbContext.Database.MigrateAsync();
            await identityDbContext.Database.MigrateAsync();

            await IdentityContextSeed.SeedAsync(userManager, rolManager);

        }
    }
}
