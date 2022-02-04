using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tsp.CustomerService.Infrastructure.Persistence.Contexts;

namespace Tsp.CustomerService.Application.Test.Config
{
    public static class ApplicationDbContextInMemory
    {
        public static ApplicationContext Get()
        {
            var options = new DbContextOptionsBuilder<ApplicationContext>()
                .UseInMemoryDatabase(databaseName: $"TspTestdb")
                .Options;

            return new ApplicationContext(options, null, null);
        }
    }
}
