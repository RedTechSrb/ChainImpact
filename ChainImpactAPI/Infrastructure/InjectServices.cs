using ChainImpactAPI.Application.RepositoryInterfaces;
using ChainImpactAPI.Infrastructure.Repositories;

namespace ChainImpactAPI.Infrastructure
{
    public static class InjectServices
    {

        public static IServiceCollection AddRepositories(this IServiceCollection services)
        {
            services.AddTransient<IProjectRepository, ProjectRepository>();

            return services;
        }

    }
}
