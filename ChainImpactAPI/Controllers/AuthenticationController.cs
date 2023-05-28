using ChainImpactAPI.Application.ServiceInterfaces;
using Microsoft.AspNetCore.Mvc;

namespace ChainImpactAPI.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class AuthenticationController : ControllerBase
    {
 
        private readonly IAuthenticationService authenticationService;

        public AuthenticationController(IAuthenticationService authenticationService)
        {
            this.authenticationService = authenticationService;
        }


    }
}
