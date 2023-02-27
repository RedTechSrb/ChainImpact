using ChainImpactAPI.Application.RepositoryInterfaces;
using ChainImpactAPI.Application.ServiceInterfaces;

namespace ChainImpactAPI.Infrastructure.Services
{
    public class CharityService : ICharityService
    {
        private readonly IConfiguration configuration;
        private readonly ICharityRepository charityTypeRepository;

        public CharityService(
            IConfiguration configuration,
            ICharityRepository charityTypeRepository)
        {
            this.configuration = configuration;
            this.charityTypeRepository = charityTypeRepository;
        }

    }
}
