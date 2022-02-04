using System;

namespace Tsp.CustomerService.Application.Exceptions
{
    public abstract class AppException : Exception
    {
        protected AppException(string title, string message)
            : base(message) =>
            Title = title;

        public string Title { get; }
    }
}
