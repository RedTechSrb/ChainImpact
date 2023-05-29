using ChainImpactAPI.Dtos.Authentication;

namespace ChainImpactAPI.Authentication
{
    public interface IJwtTokenGenerator
    {
        string GenerateJwtToken(JwtDto jwtDto);
    }

}
