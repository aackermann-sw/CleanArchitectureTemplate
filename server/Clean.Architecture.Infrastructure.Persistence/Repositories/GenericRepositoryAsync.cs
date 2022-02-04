using Clean.Architecture.Application.Enums.Services;
using Clean.Architecture.Application.Interfaces.Repositories;
using Clean.Architecture.Application.Interfaces.Shared;
using Clean.Architecture.Infrastructure.Persistence.Contexts;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Clean.Architecture.Infrastructure.Persistence.Repositories
{
    public class GenericRepositoryAsync<T> : IGenericRepositoryAsync<T> where T : class
    {
        private readonly static CacheTech cacheTech = CacheTech.Redis;
        private readonly string cacheKey = $"{typeof(T)}";
        private readonly ApplicationContext _dbContext;
        private readonly Func<CacheTech, ICacheService> _cacheService;

        public IQueryable<T> Entities => _dbContext.Set<T>();

        public GenericRepositoryAsync(ApplicationContext dbContext, Func<CacheTech, ICacheService> cacheService)
        {
            _dbContext = dbContext;
            _cacheService = cacheService;
        }

        public virtual async Task<T> GetByIdAsync(int id)
        {
            if (!_cacheService(cacheTech).TryGet(cacheKey, out T result))
            {
                result = await _dbContext.Set<T>().FindAsync(id);
                _cacheService(cacheTech).Set(cacheKey, result);
            }

            return result;
        }

        public async Task<IReadOnlyList<T>> GetPagedReponseAsync(int pageNumber, int pageSize)
        {
            return await _dbContext
                .Set<T>()
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .AsNoTracking()
                .ToListAsync();
        }

        public async Task<T> AddAsync(T entity)
        {
            await _dbContext.Set<T>().AddAsync(entity);
            _cacheService(cacheTech).Remove(cacheKey);
            return entity;
        }

        public Task UpdateAsync(T entity)
        {
            _dbContext.Entry(entity).State = EntityState.Modified;
            _cacheService(cacheTech).Remove(cacheKey);
            return Task.CompletedTask;
        }

        public Task DeleteAsync(T entity)
        {
            _dbContext.Set<T>().Remove(entity);
            _cacheService(cacheTech).Remove(cacheKey);
            return Task.CompletedTask;
        }

        public async Task<IReadOnlyList<T>> GetAllAsync(bool isCached = false)
        {
            if (!_cacheService(cacheTech).TryGet(cacheKey, out IReadOnlyList<T> cachedList))
            {
                cachedList = await _dbContext
                 .Set<T>()
                 .ToListAsync();
                _cacheService(cacheTech).Set(cacheKey, cachedList);
            }
            return cachedList;
        }
    }
}
