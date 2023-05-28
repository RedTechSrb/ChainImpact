using ChainImpactAPI.Application.ServiceInterfaces;
using ChainImpactAPI.Authentication;
using ChainImpactAPI.Dtos.Authentication;
using Microsoft.AspNet.Identity;

namespace ChainImpactAPI.Infrastructure.Services
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly IJwtTokenGenerator jwtTokenGenerator;
        private readonly IConfiguration configuration;
        private readonly IHttpClientFactory httpClientFactory;
        private PasswordHasher passwordHasher;

        public AuthenticationService(
            IConfiguration configuration,
            IJwtTokenGenerator jwtTokenGenerator,
            IHttpClientFactory httpClientFactory
        )
        {
            this.configuration = configuration;
            this.jwtTokenGenerator = jwtTokenGenerator;
            this.httpClientFactory = httpClientFactory;
            passwordHasher = new PasswordHasher();
        }

        public string generateJWT(AuthenticationRequestDto authenticationRequestDto)
        {
            return jwtTokenGenerator.GenerateJwtToken(authenticationRequestDto);
        }

        public AuthenticationResponse LoginAsync(AuthenticationRequestDto authenticationRequestDto)
        {
            throw new NotImplementedException();
        }
    }
}
