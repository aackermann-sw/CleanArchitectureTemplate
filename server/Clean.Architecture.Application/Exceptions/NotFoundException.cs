using System;
using System.Collections.Generic;
using System.Text;

namespace Clean.Architecture.Application.Exceptions
{
    public class NotFoundException : AppException
    {
        public NotFoundException(string message)
            : base("Not Found", message)
        {
        }
    }
}
