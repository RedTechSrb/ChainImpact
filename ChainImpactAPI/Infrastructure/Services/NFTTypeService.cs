using ChainImpactAPI.Application.RepositoryInterfaces;
using ChainImpactAPI.Application.ServiceInterfaces;

namespace ChainImpactAPI.Infrastructure.Services
{
    public class NFTTypeService : INFTTypeService
    {
        private readonly IConfiguration configuration;
        private readonly INFTTypeRepository nFTTypeRepository;

        public NFTTypeService(
            IConfiguration configuration,
            INFTTypeRepository nFTTypeRepository)
        {
            this.configuration = configuration;
            this.nFTTypeRepository = nFTTypeRepository;
        }

    }
}
