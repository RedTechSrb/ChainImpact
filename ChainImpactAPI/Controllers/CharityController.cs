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
        public IActionResult SearchCharities(GenericDto<CharitySearchDto>? charitySearchDto)
        {

            var charityDtoList = charityService.SearchCharities(charitySearchDto);

            return Ok(charityDtoList);
        }


    }
}
