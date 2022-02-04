using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Clean.Architecture.Application.Features.Products.Queries.GetAll;
using Clean.Architecture.Application.Features.Products.Queries.GetById;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading;
using Clean.Architecture.Application.Features.Products.Commands.Create;
using Clean.Architecture.Application.Features.Products.Commands.Update;
using Clean.Architecture.Application.Features.Products.Commands.Delete;

namespace Clean.Architecture.PublicAPI.Controllers.v1
{
    public class ProductController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] GetAllProductsParameter filter)
        {

            return Ok(await Mediator.Send(new GetAllProductsQuery() { PageSize = filter.PageSize, PageNumber = filter.PageNumber}));
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var product = await Mediator.Send(new GetProductByIdQuery { Id = id });
            return Ok(product);
        }

        [HttpPost("Create")]
        public async Task<IActionResult> Create([FromForm]CreateProductCommand request, CancellationToken cancellationToken)
        {
            var id = await Mediator.Send(request, cancellationToken);

            return Ok(new { id = id.Data });
        }


        [HttpPut("Update")]
        public async Task<IActionResult> Update([FromForm] UpdateProductCommand request, CancellationToken cancellationToken)
        {
            await Mediator.Send(request, cancellationToken);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await Mediator.Send(new DeleteProductByIdCommand { Id = id });
            
            return NoContent();
        }
    }
}
