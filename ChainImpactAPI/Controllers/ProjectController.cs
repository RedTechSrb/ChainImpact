using ChainImpactAPI.Services;
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

        [HttpGet(Name = "get")]
        public IActionResult Get()
        {

            var projectDtoList = projectService.GetProjects();

            return Ok(projectDtoList);
        }


    }
}