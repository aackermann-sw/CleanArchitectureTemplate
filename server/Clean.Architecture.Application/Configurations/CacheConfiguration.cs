using System;
using System.Collections.Generic;
using System.Text;

namespace Clean.Architecture.Application.Configurations
{
    public class CacheConfiguration
    {
        public int AbsoluteExpirationInHours { get; set; }
        public int SlidingExpirationInMinutes { get; set; }
    }
}
