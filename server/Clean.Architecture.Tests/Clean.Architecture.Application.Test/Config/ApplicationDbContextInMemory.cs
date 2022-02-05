using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Clean.Architecture.Infrastructure.Persistence.Contexts;

namespace Clean.Architecture.Application.Test.Config
{
    public static class ApplicationDbContextInMemory
    {
        public static ApplicationContext Get()
        {
            var options = new DbContextOptionsBuilder<ApplicationContext>()
                .UseInMemoryDatabase(databaseName: $"Testdb")
                .Options;

            return new ApplicationContext(options, null, null);
        }
    }
}
