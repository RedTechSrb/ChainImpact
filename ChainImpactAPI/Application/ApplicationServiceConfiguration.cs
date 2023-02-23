using ChainImpactAPI.Application.ServiceInterfaces;
using ChainImpactAPI.Infrastructure.Services;

namespace ChainImpactAPI.Application
{
    public static class ApplicationServiceConfiguration
    {

        public static IServiceCollection AddServices(this IServiceCollection services)
        {
            return services.AddScoped<IProjectService, ProjectService>();
        }

    }
}
