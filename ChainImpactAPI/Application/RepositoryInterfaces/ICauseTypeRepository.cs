using ChainImpactAPI.Dtos;
using ChainImpactAPI.Dtos.SearchDtos;
using ChainImpactAPI.Models;

namespace ChainImpactAPI.Application.RepositoryInterfaces
{
    public interface ICauseTypeRepository : IGenericRepository<CauseType>
    {
        Task<List<CauseType>> SearchAsync(GenericDto<CauseTypeDto>? causeTypeDto);
    }
}
