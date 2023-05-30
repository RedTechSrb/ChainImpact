using ChainImpactAPI.Application.ServiceInterfaces;
using ChainImpactAPI.Dtos.ImpactorsWithDonations;
using ChainImpactAPI.Dtos;
using ChainImpactAPI.Dtos.SearchDtos;
using Microsoft.AspNetCore.Mvc;

namespace ChainImpactAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProjectController : ControllerBase
    {
        private readonly IProjectService projectService;

        public ProjectController(IProjectService projectService)
        {
            this.projectService = projectService;
        }

        [HttpGet(Name = "project/getall")]
        public IActionResult Get()
        {

            var projectDtoList = projectService.GetProjects();

            return Ok(projectDtoList);
        }

        [HttpPost("search")]
        public IActionResult SearchProjects(GenericDto<ProjectDto>? projectDto)
        {

            var projectDtoList = projectService.SearchProjects(projectDto);

            return Ok(projectDtoList);
        }


    }
}