using Tsp.CustomerService.Application.Extensions;
using Tsp.CustomerService.Application.Interfaces.Shared;
using Tsp.CustomerService.Infrastructure.Persistence.Extensions;
using Tsp.CustomerService.Infrastructure.Shared.Extensions;
using Tsp.CustomerService.PublicAPI.Extensions;
using Tsp.CustomerService.PublicAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Serilog;

namespace Tsp.CustomerService.PublicAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public IConfiguration _configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.ConfigureCORSPolicy(_configuration);
            services.AddApplicationLayer();
            services.AddBehaviors();
            services.AddSharedInfrastructure(_configuration);
            services.AddApiVersioningExtension();
            services.AddSwaggerService();
            services.AddControllers();
            services.AddPersistenceInfrastructureForApi(_configuration);
            services.AddHttpContextAccessor();
            //For In-Memory Caching
            services.AddMemoryCache();
            services.AddScoped<IAuthenticatedUserService, AuthenticatedUserService>();
            services.AddElasticSearchService(_configuration);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ILoggerFactory loggerFactory)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseExceptionHandlingMiddleware();
            app.UseCors(_configuration["CorsPolicyDefaultName"]);
            app.UseHttpsRedirection();
            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseSwaggerService();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            loggerFactory.UseSerilogLogging();
            app.UseSerilogMiddleware();
        }
    }
}
