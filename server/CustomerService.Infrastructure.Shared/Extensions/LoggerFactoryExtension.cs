﻿using Microsoft.Extensions.Logging;
using Serilog;
using System;
using System.Collections.Generic;
using System.Text;

namespace Tsp.CustomerService.Infrastructure.Shared.Extensions
{
    public static class LoggerFactoryExtension
    {
        public static void UseSerilogLogging(this ILoggerFactory loggerFactory)
        {
            loggerFactory.AddSerilog();
        }

    }
}
