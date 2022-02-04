using Tsp.CustomerService.Application.Interfaces.Repositories;
using Tsp.CustomerService.Application.Wrappers;
using Tsp.CustomerService.Domain.Entities;
using AutoMapper;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Tsp.CustomerService.Application.Exceptions;

namespace Tsp.CustomerService.Application.Features.Products.Commands.Create
{

    [Serializable]
    public partial class CreateProductCommandException : AppException
    {
        public CreateProductCommandException(string message) : base("Already exists", message){}
    }

    public partial class CreateProductCommand : IRequest<Response<int>>
    {
        public string Name { get; set; }
        public string Barcode { get; set; }
        public string Description { get; set; }
        public decimal Rate { get; set; }
    }
    public class CreateProductCommandHandler : IRequestHandler<CreateProductCommand, Response<int>>
    {
        private readonly IProductRepositoryAsync _productRepository;
        private readonly IMapper _mapper;

        private IUnitOfWork _unitOfWork { get; set; }
        public CreateProductCommandHandler(IProductRepositoryAsync productRepository, IUnitOfWork unitOfWork, IMapper mapper)
        {
            _productRepository = productRepository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<Response<int>> Handle(CreateProductCommand request, CancellationToken cancellationToken)
        {
            await HandlerValidations(request);

            var product = _mapper.Map<Product>(request);
            await _productRepository.AddAsync(product);
            return new Response<int>(await _unitOfWork.Commit(cancellationToken));
        }

        private async Task HandlerValidations(CreateProductCommand request)
        {
            var result = await _productRepository.IsUniqueBarcodeAsync(request.Barcode);

            if (!result)
                throw new CreateProductCommandException($"{request}");
        }
    }
}
