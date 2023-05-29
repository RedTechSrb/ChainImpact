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

        //    var authResult = new AuthenticationResponse();
        //    try
        //    {
                var authResult = authenticationService.LoginAsync(authenticationRequestDto);
        //    }
        //    catch (Exception ex)
        //    {
        //        if (ex.Message.Contains(""))
        //            return StatusCode(401, "Istekla Vam je sesija, molimo Vas da se ponovo ulogujete!");
        //        else
        //            return BadRequest("Uneli ste pogresnu lozinku");
        //    }


            return Ok(authResult);

        }

    }
}
