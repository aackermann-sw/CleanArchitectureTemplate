using Tsp.CustomerService.Application.Wrappers;
using Tsp.CustomerService.Domain.Entities;
using System.Threading.Tasks;

namespace Tsp.CustomerService.Application.Interfaces.Repositories
{
    public interface IProductRepositoryAsync : IGenericRepositoryAsync<Product>
    {
        Task<PagedResponse<Product>> GetAllAsync(int pageNumber, int pageSize, bool isCached = false);
        Task<bool> IsUniqueBarcodeAsync(string barcode);
    }
}
