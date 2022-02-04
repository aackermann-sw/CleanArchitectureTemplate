using Tsp.CustomerService.Domain.Common;
using Tsp.CustomerService.Infrastructure.Persistence.Extensions;
using Tsp.CustomerService.Infrastructure.Persistence.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Tsp.CustomerService.Infrastructure.Persistence.Contexts
{
    public class IdentityContext : IdentityDbContext<ApplicationUser>
    {
        public IdentityContext(DbContextOptions<IdentityContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.BuildIdentityTable();
        }
    }
}
