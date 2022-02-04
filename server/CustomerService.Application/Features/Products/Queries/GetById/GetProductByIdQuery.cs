﻿using Tsp.CustomerService.Application.Exceptions;
using Tsp.CustomerService.Application.Interfaces.Repositories;
using Tsp.CustomerService.Application.Wrappers;
using Tsp.CustomerService.Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Tsp.CustomerService.Application.Features.Products.Queries.GetById
{
    public class GetProductByIdQuery : IRequest<Response<Product>>
    {
        public int Id { get; set; }
        public class GetProductByIdQueryHandler : IRequestHandler<GetProductByIdQuery, Response<Product>>
        {
            private readonly IProductRepositoryAsync _productRepository;
            public GetProductByIdQueryHandler(IProductRepositoryAsync productRepository)
            {
                _productRepository = productRepository;
            }
            public async Task<Response<Product>> Handle(GetProductByIdQuery query, CancellationToken cancellationToken)
            {
                var product = await _productRepository.GetByIdAsync(query.Id);
                if (product == null) throw new NotFoundException($"{nameof(Product)} - {query.Id}");
                return new Response<Product>(product);
            }
        }
    }
}
