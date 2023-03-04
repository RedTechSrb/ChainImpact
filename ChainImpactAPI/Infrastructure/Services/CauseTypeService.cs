using ChainImpactAPI.Application.RepositoryInterfaces;
using ChainImpactAPI.Application.ServiceInterfaces;
using ChainImpactAPI.Dtos;
using ChainImpactAPI.Infrastructure.Repositories;
using ChainImpactAPI.Models;

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

        public List<CauseTypeDto> SearchCauseTypes(GenericDto<CauseTypeDto>? causeTypeDto)
        {
            var causeTypes = causeTypeRepository.SearchAsync(causeTypeDto).Result;

            var causeTypesDtoList = new List<CauseTypeDto>();
            foreach (var causeType in causeTypes)
            {
                causeTypesDtoList.Add(new CauseTypeDto(
                                            causeType.id,
                                            causeType.name
                                        ));
            }

            return causeTypesDtoList;

        }
    }
}