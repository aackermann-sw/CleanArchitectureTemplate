using Clean.Architecture.Application.Wrappers;
using Clean.Architecture.Domain.Entities;
using System.Threading.Tasks;

namespace Clean.Architecture.Application.Interfaces.Repositories
{
    public interface IProductRepositoryAsync : IGenericRepositoryAsync<Product>
    {
        Task<PagedResponse<Product>> GetAllAsync(int pageNumber, int pageSize, bool isCached = false);
        Task<bool> IsUniqueBarcodeAsync(string barcode);
    }
}
