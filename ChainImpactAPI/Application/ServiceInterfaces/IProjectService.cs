using ChainImpactAPI.Dtos;
using ChainImpactAPI.Dtos.SearchDtos;

namespace ChainImpactAPI.Application.ServiceInterfaces
{
    public interface IProjectService
    {
        List<ProjectDto> GetProjects();
        List<ProjectDto> SearchProjects(GenericDto<ProjectSearchDto>? projectSearchDto);
    }
}
