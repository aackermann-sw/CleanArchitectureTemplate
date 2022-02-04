using AutoMapper;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System.Threading.Tasks;
using Clean.Architecture.Application.Features.Products.Commands.Create;
using Clean.Architecture.Application.Interfaces.Repositories;
using Clean.Architecture.Application.Mappings;
using Clean.Architecture.Application.Test.Config;
using Clean.Architecture.Domain.Entities;
using Clean.Architecture.Infrastructure.Persistence.Repositories;
using Clean.Architecture.Infrastructure.Shared.Services;

namespace Clean.Architecture.Application.Test
{

    [TestClass]
    public class CreateProductCommandHandlerTest
    {

        private Mock<IProductRepositoryAsync> _mockRepository;
        private IProductRepositoryAsync _realRepository;
        private UnitOfWork _mockUnitOfWork;
        private static IMapper _mapper;


        [TestInitialize]
        public void Setup()
        {
            _mockRepository = new Mock<IProductRepositoryAsync>();
            _realRepository = new ProductRepositoryAsync(ApplicationDbContextInMemory.Get(), serviceProvider => { return new NoneCacheService();});
            _mockUnitOfWork = new UnitOfWork(ApplicationDbContextInMemory.Get());
            if (_mapper == null)
            {
                var mappingConfig = new MapperConfiguration(mc =>
                {
                    mc.AddProfile(new ProductProfile());
                });
                IMapper mapper = mappingConfig.CreateMapper();
                _mapper = mapper;
            }
        }


        [TestMethod]
        public async Task TryCreateProductValidIsNotUniqueBarcode()
        {
            var barcode = "1";

            _mockRepository.Setup(x => x.IsUniqueBarcodeAsync(barcode)).ReturnsAsync(false);

            var command = new CreateProductCommandHandler(_mockRepository.Object, _mockUnitOfWork, _mapper);

            await Assert.ThrowsExceptionAsync<CreateProductCommandException>(() => command.Handle( new CreateProductCommand() { Barcode = barcode, Description = "descripcion", Name = "Nombre", Rate = 1 }, new System.Threading.CancellationToken()));

        }

        [TestMethod]
        public async Task TryCreateProductSuccessMocked()
        {
            var barcode = "1";
            var productCommand = new CreateProductCommand() { Barcode = barcode, Description = "descripcion", Name = "Nombre", Rate = 1 };
            var product = _mapper.Map<Product>(productCommand);

            _mockRepository.Setup(x => x.IsUniqueBarcodeAsync(barcode)).ReturnsAsync(true);
            _mockRepository.Setup(x => x.AddAsync(product)).ReturnsAsync(product);

            var command = new CreateProductCommandHandler(_mockRepository.Object, _mockUnitOfWork, _mapper);

            await command.Handle(productCommand, new System.Threading.CancellationToken());

        }
        [TestMethod]
        public async Task TryCreateProductSuccess()
        {
            var barcode = "1";
            var productCommand = new CreateProductCommand() { Barcode = barcode, Description = "descripcion", Name = "Nombre", Rate = 1 };

            var command = new CreateProductCommandHandler(_realRepository, _mockUnitOfWork, _mapper);

            var result = await command.Handle(productCommand, new System.Threading.CancellationToken());

            Assert.IsTrue(result.Succeeded);
        }

    }
}
