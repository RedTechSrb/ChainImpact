using ChainImpactAPI.Application.ServiceInterfaces;
using ChainImpactAPI.Dtos.SearchDtos;
using ChainImpactAPI.Dtos;
using ChainImpactAPI.Infrastructure.Services;
using Microsoft.AspNetCore.Mvc;

namespace ChainImpactAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MilestoneController : ControllerBase
    {
        private readonly IMilestoneService milestoneService;

        public MilestoneController(IMilestoneService milestoneService)
        {
            this.milestoneService = milestoneService;
        }

        [HttpPost("search")]
        public IActionResult SearchMilestones(GenericDto<MilestoneDto>? milestoneDto)
        {

            var milestonesList = milestoneService.SearchMilestones(milestoneDto);

            return Ok(milestonesList);
        }

    }
}
