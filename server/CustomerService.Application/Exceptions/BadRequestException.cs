using System;

namespace Tsp.CustomerService.Application.Exceptions
{
    public abstract class BadRequestException : AppException
    {
        protected BadRequestException(string message)
            : base("Bad Request", message)
        {
        }
    }
}
