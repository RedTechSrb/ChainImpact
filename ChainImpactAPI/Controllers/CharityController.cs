using ChainImpactAPI.Dtos.SearchDtos;
using ChainImpactAPI.Dtos;
using ChainImpactAPI.Infrastructure.Services;
using Microsoft.AspNetCore.Mvc;
using ChainImpactAPI.Application.ServiceInterfaces;

namespace ChainImpactAPI.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class CharityController : ControllerBase
    {

        private readonly ICharityService charityService;

        public CharityController(ICharityService charityService)
        {
            this.charityService = charityService;
        }


        [HttpPost("search")]
        public IActionResult SearchCharities(GenericDto<CharityDto>? charityDto)
        {

            var savedCharity = charityService.SearchCharities(charityDto);

            return Ok(savedCharity);
        }

        [HttpPost("save")]
        public IActionResult SaveCharity(CharityDto charityDto)
        {

            var charityDtoList = charityService.SaveCharity(charityDto);

            return Ok(charityDtoList);
        }

    }
}
