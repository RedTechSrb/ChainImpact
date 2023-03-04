using ChainImpactAPI.Dtos.SearchDtos;
using ChainImpactAPI.Dtos;
using ChainImpactAPI.Models;

namespace ChainImpactAPI.Application.RepositoryInterfaces
{
    public interface ICharityRepository : IGenericRepository<Charity>
    {
        Task<List<Charity>> SearchAsync(GenericDto<CharitySearchDto>? charitySearchDto);
    }
}
