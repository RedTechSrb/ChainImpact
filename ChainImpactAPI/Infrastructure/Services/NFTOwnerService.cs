using ChainImpactAPI.Application.RepositoryInterfaces;
using ChainImpactAPI.Application.ServiceInterfaces;

namespace ChainImpactAPI.Infrastructure.Services
{
    public class NFTOwnerService : INFTOwnerService
    {
        private readonly IConfiguration configuration;
        private readonly INFTOwnerRepository nFTOwnerRepository;

        public NFTOwnerService(
            IConfiguration configuration,
            INFTOwnerRepository nFTOwnerRepository)
        {
            this.configuration = configuration;
            this.nFTOwnerRepository = nFTOwnerRepository;
        }

    }
}
