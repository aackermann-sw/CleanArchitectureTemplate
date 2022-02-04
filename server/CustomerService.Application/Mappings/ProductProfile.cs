using Tsp.CustomerService.Application.Features.Products.Commands.Create;
using Tsp.CustomerService.Application.Features.Products.Queries.GetAll;
using Tsp.CustomerService.Domain.Entities;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Text;

namespace Tsp.CustomerService.Application.Mappings
{
    public class ProductProfile : Profile
    {
        public ProductProfile()
        {
            CreateMap<Product, GetAllProductsViewModel>().ReverseMap();
            CreateMap<CreateProductCommand, Product>();
            CreateMap<GetAllProductsQuery, GetAllProductsParameter>();
        }
    }
}
