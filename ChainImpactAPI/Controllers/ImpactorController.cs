using ChainImpactAPI.Application.ServiceInterfaces;
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
    }
}
