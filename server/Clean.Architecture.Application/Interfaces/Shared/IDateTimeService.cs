using System;

namespace Clean.Architecture.Application.Interfaces.Shared
{
    public interface IDateTimeService
    {
        DateTime Now { get; }
    }
}
