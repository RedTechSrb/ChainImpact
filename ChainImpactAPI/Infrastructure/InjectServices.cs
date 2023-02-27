using ChainImpactAPI.Application.RepositoryInterfaces;
using ChainImpactAPI.Infrastructure.Repositories;

namespace ChainImpactAPI.Infrastructure
{
    public static class InjectServices
    {

        public static IServiceCollection AddRepositories(this IServiceCollection services)
        {
            services.AddTransient<ICauseTypeRepository, CauseTypeRepository>()
                    .AddTransient<ICharityRepository, CharityRepository>()
                    .AddTransient<IDonationRepository, DonationRepository>()
                    .AddTransient<IImpactorRepository, ImpactorRepository>()
                    .AddTransient<INFTOwnerRepository, NFTOwnerRepository>()
                    .AddTransient<INFTTypeRepository, NFTTypeRepository>()
                    .AddTransient<IProjectRepository, ProjectRepository>()
                    .AddTransient<ITransactionRepository, TransactionRepository>()
                    ;

            return services;
        }

    }
}
