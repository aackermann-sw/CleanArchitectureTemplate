using System;
using System.Collections.Generic;
using System.Text;

namespace Tsp.CustomerService.Application.Exceptions
{
    public class NotFoundException : AppException
    {
        public NotFoundException(string message)
            : base("Not Found", message)
        {
        }
    }
}
