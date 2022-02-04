using Clean.Architecture.Application.Interfaces.Shared;
using System;
using System.Collections.Generic;
using System.Text;

namespace Clean.Architecture.Infrastructure.Shared.Services
{
    public class DateTimeService : IDateTimeService
    {
        public DateTime Now => DateTime.Now;
    }
}
