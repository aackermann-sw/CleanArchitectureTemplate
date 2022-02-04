using Tsp.CustomerService.Infrastructure.Redis.Entities;
using Tsp.CustomerService.Infrastructure.Redis.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;

namespace Tsp.CustomerService.Infrastructure.Redis
{
    /// <summary>
    /// Redis önbellek mekanizması için genişletme metotlarını barındırır.
    /// </summary>
    public static class ServiceRegister
    {
        /// <summary>
        /// <see cref="RedisOptions"/> sınıfının özelliklerine göre redis önbellek servisini ekler.
        /// </summary>
        /// <param name="services">Servis kümesi.</param>
        /// <param name="configuration">Yapılandırma ayarları.</param>
        /// <returns>Servis kümesini döndürür.</returns>
        public static IServiceCollection AddRedisService(this IServiceCollection services, IConfiguration configuration, JsonSerializerSettings settings = default)
        {
            RedisOptions redisOptions = new RedisOptions();
            IConfigurationSection configurationSection = configuration.GetSection(nameof(RedisOptions));
            configurationSection.Bind(redisOptions);

            services.Configure<RedisOptions>(configureOptions =>
            {
                configureOptions.ConnectionString = redisOptions.ConnectionString;
                configureOptions.DatabaseId = redisOptions.DatabaseId;
                configureOptions.Timeout = redisOptions.Timeout;
            });

            services.AddScoped<IRedisService, RedisService>();
            services.AddSingleton<JsonSerializerSettings>(x => settings ?? new JsonSerializerSettings() { MissingMemberHandling = MissingMemberHandling.Ignore });
            services.AddTransient<ISerializer, Serializer>();

            return services;
        }
    }
}