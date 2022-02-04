using Tsp.CustomerService.Application.Interfaces.Shared;
using System;
using System.Collections.Generic;
using System.Text;
using Tsp.CustomerService.Infrastructure.Redis.Services;

namespace Tsp.CustomerService.Infrastructure.Shared.Services
{
    public class RedisCacheService : ICacheService
    {

        private readonly IRedisService redisService;

        /// <summary>
        /// <see cref="IRedisService"/> 
        /// </summary>
        /// <param name="redisService"></param>
        public RedisCacheService(IRedisService redisService)
        {
            this.redisService = redisService;
        }

        public void Remove(string cacheKey)
        {
            this.redisService.Delete(cacheKey);
        }

        public T Set<T>(string cacheKey, T value)
        {
            if (value == null)
                return value;

            this.redisService.SetCache<T>(cacheKey, value, redisService.Timeout);
            return value;
        }

        public bool TryGet<T>(string cacheKey, out T value)
        {
            value = this.redisService.GetCache<T>(cacheKey);
            if (value == null) return false;
            else return true;
        }
    }
}
