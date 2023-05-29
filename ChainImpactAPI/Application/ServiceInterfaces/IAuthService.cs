using ChainImpactAPI.Dtos.Authentication;

namespace ChainImpactAPI.Application.ServiceInterfaces
{
    public interface IAuthService
    {
        AuthenticationResponse LoginAsync(AuthenticationRequestDto loginRequestDto);

    }
}
