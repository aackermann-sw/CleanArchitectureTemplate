using Microsoft.AspNetCore.Builder;
using Clean.Architecture.PublicAPI.Middlewares;

namespace Clean.Architecture.PublicAPI.Extensions
{
    public static class ApplicationBuilderExtension
    {

        public static IApplicationBuilder UseSerilogMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<SerilogMiddleware>();
        }
    }
}
