using ChainImpactAPI.Application.ServiceInterfaces;
using ChainImpactAPI.Dtos;
using ChainImpactAPI.Dtos.NFT;
using ChainImpactAPI.Dtos.SearchDtos;
using ChainImpactAPI.Infrastructure.Services;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Text;

namespace ChainImpactAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class NFTTypeController : ControllerBase
    {

        private readonly INFTTypeService NFTTypeService;

        public NFTTypeController(INFTTypeService NFTTypeService)
        {
            this.NFTTypeService = NFTTypeService;
        }

        [HttpGet()]
        public IActionResult Get()
        {

            var nftDtolist = NFTTypeService.GetNFTList();

            return Ok(nftDtolist);
        }

        [HttpGet("getNFTsData")]
        public IActionResult Get([FromQuery] int tier, [FromQuery] int userType, [FromQuery] string causeType)
        {

            var data = NFTTypeService.GetNFTsData(new GenericDto<NFTRequestDto>(null, null, new NFTRequestDto { tier = tier, usertype = userType, causetype = causeType })).FirstOrDefault();
            var jsonData = JsonConvert.SerializeObject(data);
            var responseBytes = Encoding.UTF8.GetBytes(jsonData);

            Response.Headers.Add("Content-Type", "text/plain; charset=utf-8");
            Response.Headers.Add("Content-Security-Policy", "default-src 'none'; style-src 'unsafe-inline'; sandbox");

            return new FileContentResult(responseBytes, "text/plain; charset=utf-8");

        }


        [HttpPost("NFTsData")]
        public IActionResult SearchNFTTypes(GenericDto<NFTRequestDto>? nftDto)
        {

            var nftDtolist = NFTTypeService.GetNFTsData(nftDto);

            return Ok(nftDtolist);
        }

    }
}
