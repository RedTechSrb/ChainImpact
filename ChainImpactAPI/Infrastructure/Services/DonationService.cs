using ChainImpactAPI.Application.RepositoryInterfaces;
using ChainImpactAPI.Application.ServiceInterfaces;

namespace ChainImpactAPI.Infrastructure.Services
{
    public class DonationService : IDonationService
    {
        private readonly IConfiguration configuration;
        private readonly IDonationRepository donationTypeRepository;

        public DonationService(
            IConfiguration configuration,
            IDonationRepository donationTypeRepository)
        {
            this.configuration = configuration;
            this.donationTypeRepository = donationTypeRepository;
        }

    }
}
