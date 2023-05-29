using ChainImpactAPI.Application.RepositoryInterfaces;
using ChainImpactAPI.Infrastructure.Repositories;
using Serilog.Extensions.Hosting;
using Serilog;
using ChainImpactAPI.Authentication;

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
                    .AddTransient<IMilestoneRepository, MilestoneRepository>()
                    ;

            return services;
        }

        public static IServiceCollection AddJwtTokenGenerator(this IServiceCollection services)
        {
            services.AddSingleton<IJwtTokenGenerator, JwtTokenGenerator>();
            services.AddSingleton<JwtSettings>();
            services.AddSingleton<DiagnosticContext>();
            services.AddSingleton<Serilog.ILogger>(new LoggerConfiguration()
                .WriteTo.Console()
                .CreateLogger());
            return services;
        }


    }
}
