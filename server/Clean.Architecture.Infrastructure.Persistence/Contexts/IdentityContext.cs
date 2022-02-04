using Clean.Architecture.Domain.Common;
using Clean.Architecture.Infrastructure.Persistence.Extensions;
using Clean.Architecture.Infrastructure.Persistence.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Clean.Architecture.Infrastructure.Persistence.Contexts
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
