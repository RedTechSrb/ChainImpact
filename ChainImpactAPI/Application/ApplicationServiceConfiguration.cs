using ChainImpactAPI.Application.ServiceInterfaces;
using ChainImpactAPI.Infrastructure.Services;

namespace ChainImpactAPI.Application
{
    public static class ApplicationServiceConfiguration
    {

        public static IServiceCollection AddServices(this IServiceCollection services)
        {
            services.AddScoped<ICauseTypeService, CauseTypeService>()
                    .AddScoped<ICharityService, CharityService>()
                    .AddScoped<IDonationService, DonationService>()
                    .AddScoped<IImpactorService, ImpactorService>()
                    .AddScoped<INFTOwnerService, NFTOwnerService>()
                    .AddScoped<INFTTypeService, NFTTypeService>()
                    .AddScoped<IProjectService, ProjectService>()
                    .AddScoped<ITransactionService, TransactionService>()
                    .AddScoped<IMilestoneService, MilestoneService>()
                    .AddScoped<IAuthService, AuthService>()
                    ;

            return services;
        }
    }
}
