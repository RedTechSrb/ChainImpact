using ChainImpactAPI.Application.RepositoryInterfaces;
using ChainImpactAPI.Application.ServiceInterfaces;
using ChainImpactAPI.Dtos;

namespace ChainImpactAPI.Infrastructure.Services
{
    public class CauseTypeService : ICauseTypeService
    {
        private readonly IConfiguration configuration;
        private readonly ICauseTypeRepository causeTypeRepository;

        public CauseTypeService(
            IConfiguration configuration,
            ICauseTypeRepository causeTypeRepository)
        {
            this.configuration = configuration;
            this.causeTypeRepository = causeTypeRepository;
        }

    }
}