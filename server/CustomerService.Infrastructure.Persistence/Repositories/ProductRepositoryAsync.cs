using Tsp.CustomerService.Application.Enums.Services;
using Tsp.CustomerService.Application.Interfaces.Repositories;
using Tsp.CustomerService.Application.Interfaces.Shared;
using Tsp.CustomerService.Application.Wrappers;
using Tsp.CustomerService.Domain.Entities;
using Tsp.CustomerService.Infrastructure.Persistence.Contexts;
using Tsp.CustomerService.Infrastructure.Persistence.Extensions;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Tsp.CustomerService.Infrastructure.Persistence.Repositories
{
    public class ProductRepositoryAsync : GenericRepositoryAsync<Product>, IProductRepositoryAsync
    {
        private readonly static CacheTech cacheTech = CacheTech.Redis;
        private readonly string cacheKey = $"{typeof(Product)}";
        private readonly Func<CacheTech, ICacheService> _cacheService;
        private readonly DbSet<Product> _products;

        public ProductRepositoryAsync(ApplicationContext dbContext, Func<CacheTech, ICacheService> cacheService) : base(dbContext, cacheService)
        {
            _products = dbContext.Set<Product>();
            _cacheService = cacheService;
        }

        public async Task<PagedResponse<Product>> GetAllAsync(int pageNumber, int pageSize, bool isCached = false)
        {
            var paginatedList = await _products
                .Select(o => new Product
                {
                    Barcode = o.Barcode,
                    Name = o.Name,
                    Rate = o.Rate,
                    Description = o.Description,
                    Id = o.Id
                })
                .ToPaginatedListAsync<Product>(pageNumber, pageSize);
            return paginatedList;
        }


        public Task<bool> IsUniqueBarcodeAsync(string barcode)
        {
            return _products.AllAsync(p => p.Barcode != barcode);
        }
    }
}
