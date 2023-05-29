using ChainImpactAPI.Application.ServiceInterfaces;
using ChainImpactAPI.Authentication;
using ChainImpactAPI.Dtos.Authentication;
using Microsoft.AspNet.Identity;

namespace ChainImpactAPI.Infrastructure.Services
{
    public class AuthService : IAuthService
    {
        private readonly IJwtTokenGenerator jwtTokenGenerator;
        private readonly IConfiguration configuration;
        private readonly IHttpClientFactory httpClientFactory;
        private PasswordHasher passwordHasher;

        public AuthService(
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
            var jwtDto = new JwtDto(authenticationRequestDto.wallet);

            return jwtTokenGenerator.GenerateJwtToken(jwtDto);
        }

        public AuthenticationResponse LoginAsync(AuthenticationRequestDto authenticationRequestDto)
        {
            if (authenticationRequestDto.password == "string")
            {
                var token = generateJWT(authenticationRequestDto);
                return new AuthenticationResponse
                {
                    token = token
                };
            } else
            {
                throw new Exception("Greška, već ste ulogovani preko drugog uređaja!");
            }

        }
    }
}
