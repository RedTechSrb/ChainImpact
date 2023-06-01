using ChainImpactAPI.Application.ServiceInterfaces;
using ChainImpactAPI.Dtos;
using ChainImpactAPI.Dtos.ImpactorsWithDonations;
using ChainImpactAPI.Dtos.ImpactorsWithProjects;
using ChainImpactAPI.Dtos.SearchDtos;
using ChainImpactAPI.Infrastructure.Services;
using Microsoft.AspNetCore.Authorization;
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

            var impactorDtoList = impactorService.SearchImpactors(impactorSearchDto);

            return Ok(impactorDtoList);
        }

        [AllowAnonymous]
        [HttpPost("save")]
        public IActionResult SaveImpactor(ImpactorDto impactorDto)
        {

            var savedImpactor = impactorService.SaveImpactor(impactorDto);

            return Ok(savedImpactor);
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public IActionResult RegisterImpactor(ImpactorDto impactorDto)
        {

            var updatedImpactor = impactorService.RegisterImpactor(impactorDto);

            return Ok(updatedImpactor);
        }

        [Authorize]
        [HttpPost("update")]
        public IActionResult UpdateImpactor(ImpactorDto impactorDto)
        {

            var updatedImpactor = impactorService.UpdateImpactor(impactorDto);

            return Ok(updatedImpactor);
        }

        [Authorize(Roles = "SuperAdmin")]
        [HttpPost("confirm")]
        public IActionResult ConfirmImpactor(ImpactorDto impactorDto)
        {

            var confirmedImpactor = impactorService.UpdateImpactor(impactorDto);

            return Ok(confirmedImpactor);
        }

        [HttpPost("ImpactorsWithProjects")]
        public IActionResult GetImpactorsWithProjects(GenericDto<ImpactorDto>? impactorsWithDonationsRequestDto)
        {

            var impactorsWithProjectsDtoList = impactorService.GetImpactorsWithProjects(impactorsWithDonationsRequestDto);

            return Ok(impactorsWithProjectsDtoList);
        }

        [HttpPost("ImpactorsWithNFTs")]
        public IActionResult GetImpactorsWithNFTs(ImpactorDto impactorDto)
        {

            var impactorsWithNFTs = impactorService.GetImpactorsWithNFTs(impactorDto);

            return Ok(impactorsWithNFTs);
        }


    }
}
