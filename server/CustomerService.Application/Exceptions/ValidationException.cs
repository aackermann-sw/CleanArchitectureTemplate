using FluentValidation.Results;
using System;
using System.Collections.Generic;
using System.Text;

namespace Tsp.CustomerService.Application.Exceptions
{
    public class ValidationException : AppException
    {
        public ValidationException(IReadOnlyDictionary<string, string[]> errorsDictionary)
            : base("Validation Failure", "One or more validation errors occurred")
            => ErrorsDictionary = errorsDictionary;

        public IReadOnlyDictionary<string, string[]> ErrorsDictionary { get; }

    }
}
