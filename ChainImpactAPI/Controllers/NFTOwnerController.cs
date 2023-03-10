using ChainImpactAPI.Dtos.NFT;
using ChainImpactAPI.Dtos;
using ChainImpactAPI.Infrastructure.Services;
using Microsoft.AspNetCore.Mvc;
using ChainImpactAPI.Application.RepositoryInterfaces;
using ChainImpactAPI.Application.ServiceInterfaces;
using ChainImpactAPI.Dtos.NFTLeft;

namespace ChainImpactAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class NFTOwnerController : ControllerBase
    {
        private readonly IConfiguration configuration;
        private readonly INFTOwnerService nftOwnerService;

        public NFTOwnerController(
            IConfiguration configuration,
            INFTOwnerService nftOwnerService)
        {
            this.configuration = configuration;
            this.nftOwnerService = nftOwnerService;
        }


        [HttpPost("NFTLeft")]
        public IActionResult NFTLeft(NFTLeftRequestDto nftLeftRequestDto)
        {
            var nftLeftList = nftOwnerService.NFTLeft(nftLeftRequestDto);

            return Ok(nftLeftList);
        }

    }
}
