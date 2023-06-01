using ChainImpactAPI.Application.ServiceInterfaces;
using ChainImpactAPI.Authentication;
using ChainImpactAPI.Dtos;
using ChainImpactAPI.Dtos.Authentication;
using Microsoft.AspNet.Identity;
using Newtonsoft.Json.Linq;

namespace ChainImpactAPI.Infrastructure.Services
{
    public class AuthService : IAuthService
    {
        private readonly IJwtTokenGenerator jwtTokenGenerator;
        private readonly IConfiguration configuration;
        private readonly IHttpClientFactory httpClientFactory;
        private PasswordHasher passwordHasher;
        private readonly IImpactorService impactorService;


        public AuthService(
            IConfiguration configuration,
            IJwtTokenGenerator jwtTokenGenerator,
            IHttpClientFactory httpClientFactory,
            IImpactorService impactorService)
        {
            this.configuration = configuration;
            this.jwtTokenGenerator = jwtTokenGenerator;
            this.httpClientFactory = httpClientFactory;
            passwordHasher = new PasswordHasher();
            this.impactorService = impactorService;
        }

        public string generateJWT(ImpactorDto user)
        {
            var jwtDto = new JwtDto(user.wallet, user.role.Value);

            return jwtTokenGenerator.GenerateJwtToken(jwtDto);
        }

        public AuthenticationResponse LoginAsync(AuthenticationRequestDto authenticationRequestDto)
        {
            var user = impactorService.SearchImpactors(new GenericDto<ImpactorDto>(new ImpactorDto { wallet = authenticationRequestDto.wallet })).FirstOrDefault();
            // entity.Password = passwordHasher.HashPassword(entity.Password);
            if (user != null)
            {
                if (passwordHasher.VerifyHashedPassword(user.password, authenticationRequestDto.password)
                    == PasswordVerificationResult.Failed
                )
                {
                    throw new Exception("Invalid password");
                }
                else if (passwordHasher.VerifyHashedPassword(user.password, authenticationRequestDto.password)
                    == PasswordVerificationResult.SuccessRehashNeeded
                )
                {
                    throw new Exception("Password Rehash needed");
                }

                var token = generateJWT(user);
                return new AuthenticationResponse
                {
                    token = token
                };

            }
            else
            {
                throw new Exception("This wallet \"" + authenticationRequestDto.wallet + "\" is not recognized");
            }

        }
    }
}
