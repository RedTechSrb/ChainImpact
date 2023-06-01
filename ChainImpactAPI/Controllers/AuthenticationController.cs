using ChainImpactAPI.Application.ServiceInterfaces;
using ChainImpactAPI.Dtos;
using ChainImpactAPI.Dtos.Authentication;
using ChainImpactAPI.Infrastructure.Services;
using Microsoft.AspNetCore.Mvc;

namespace ChainImpactAPI.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class AuthenticationController : ControllerBase
    {
 
        private readonly IAuthService authenticationService;

        public AuthenticationController(IAuthService authenticationService)
        {
            this.authenticationService = authenticationService;
        }

        [HttpPost("auth")]
        public IActionResult Auth(AuthenticationRequestDto authenticationRequestDto)
        {
            var authResult = authenticationService.LoginAsync(authenticationRequestDto);

            return Ok(authResult);
        }

    }
}
