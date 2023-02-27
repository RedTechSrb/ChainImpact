using ChainImpactAPI.Application.RepositoryInterfaces;
using ChainImpactAPI.Application.ServiceInterfaces;

namespace ChainImpactAPI.Infrastructure.Services
{
    public class ImpactorService : IImpactorService
    {
        private readonly IConfiguration configuration;
        private readonly IImpactorRepository impactorRepository;

        public ImpactorService(
            IConfiguration configuration,
            IImpactorRepository impactorRepository)
        {
            this.configuration = configuration;
            this.impactorRepository = impactorRepository;
        }

    }
}
