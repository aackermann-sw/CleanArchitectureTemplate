using Microsoft.AspNetCore.Builder;

namespace Clean.Architecture.Infrastructure.Shared.Extensions
{
    public static class ApplicationBuilderExtension
    {
        public static void UseSwaggerService(this IApplicationBuilder app)
        {
            app.UseSwagger();
            app.UseSwaggerUI(options =>
            {
                options.SwaggerEndpoint("/swagger/V1/swagger.json", "TSP - Customer Services");
                options.RoutePrefix = "swagger";
                options.DisplayRequestDuration();
            });
        }


    }
}
