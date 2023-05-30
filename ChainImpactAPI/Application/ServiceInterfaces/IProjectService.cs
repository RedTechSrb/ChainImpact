using ChainImpactAPI.Dtos;
using ChainImpactAPI.Dtos.SearchDtos;
using ChainImpactAPI.Models;

namespace ChainImpactAPI.Application.ServiceInterfaces
{
    public interface IProjectService
    {
        List<ProjectDto> GetProjects();
        List<ProjectDto> SearchProjects(GenericDto<ProjectDto>? projectDto);
    }
}
