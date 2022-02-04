using Microsoft.AspNetCore.Builder;
using Tsp.CustomerService.PublicAPI.Middlewares;

namespace Tsp.CustomerService.PublicAPI.Extensions
{
    public static class ApplicationBuilderExtension
    {

        public static IApplicationBuilder UseSerilogMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<SerilogMiddleware>();
        }
    }
}
