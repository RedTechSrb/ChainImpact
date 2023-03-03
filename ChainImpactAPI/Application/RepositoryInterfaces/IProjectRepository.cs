using ChainImpactAPI.Dtos;
using ChainImpactAPI.Dtos.SearchDtos;
using ChainImpactAPI.Models;

namespace ChainImpactAPI.Application.RepositoryInterfaces
{
    public interface IProjectRepository : IGenericRepository<Project>
    {
        Task<List<Project>> SearchAsync(GenericDto<ProjectSearchDto>? projectSearchDto);
    }
}
