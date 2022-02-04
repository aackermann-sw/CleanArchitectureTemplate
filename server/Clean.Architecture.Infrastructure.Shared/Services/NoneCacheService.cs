using Clean.Architecture.Application.Configurations;
using Clean.Architecture.Application.Interfaces.Shared;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Options;
using System;

namespace Clean.Architecture.Infrastructure.Shared.Services
{
    public class NoneCacheService : ICacheService
    {
        public bool TryGet<T>(string cacheKey, out T value)
        {
            value = default;
            return false;
        }

        public T Set<T>(string cacheKey, T value)
        {
            return value;
        }

        public void Remove(string cacheKey)
        {
            
        }
    }
}
