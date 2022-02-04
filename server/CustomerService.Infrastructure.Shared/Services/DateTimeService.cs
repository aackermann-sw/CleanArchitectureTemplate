using Tsp.CustomerService.Application.Interfaces.Shared;
using System;
using System.Collections.Generic;
using System.Text;

namespace Tsp.CustomerService.Infrastructure.Shared.Services
{
    public class DateTimeService : IDateTimeService
    {
        public DateTime Now => DateTime.Now;
    }
}
