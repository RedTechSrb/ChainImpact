using ChainImpactAPI.Application.ServiceInterfaces;
using ChainImpactAPI.Dtos;
using ChainImpactAPI.Dtos.ImpactorsWithDonations;
using ChainImpactAPI.Dtos.ImpactorsWithProjects;
using ChainImpactAPI.Dtos.SearchDtos;
using ChainImpactAPI.Infrastructure.Services;
using Microsoft.AspNetCore.Mvc;

namespace ChainImpactAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ImpactorController : ControllerBase
    {
        private readonly IImpactorService impactorService;

        public ImpactorController(IImpactorService impactorService)
        {
            this.impactorService = impactorService;
        }

        [HttpGet(Name = "impactor/getall")]
        public IActionResult Get()
        {

            var impactorDtoList = impactorService.GetImpactors();

            return Ok(impactorDtoList);
        }

        [HttpPost("search")]
        public IActionResult SearchImpactor(GenericDto<ImpactorDto>? impactorSearchDto)
        {

            var impactorSavedImpactor = impactorService.SearchImpactors(impactorSearchDto);

            return Ok(impactorSavedImpactor);
        }

        [HttpPost("save")]
        public IActionResult SaveImpactor(ImpactorDto impactorDto)
        {

            var impactorSavedImpactor = impactorService.SaveImpactor(impactorDto);

            return Ok(impactorSavedImpactor);
        }

        [HttpPost("ImpactorsWithProjects")]
        public IActionResult GetImpactorsWithProjects(GenericDto<ImpactorDto>? impactorsWithDonationsRequestDto)
        {

            var impactorsWithProjectsDtoList = impactorService.GetImpactorsWithProjects(impactorsWithDonationsRequestDto);

            return Ok(impactorsWithProjectsDtoList);
        }

        [HttpGet("SKInfo")]
        public IActionResult GetSKInfo()
        {
            return Ok(impactorService.GetSK());
        }


    }
}
