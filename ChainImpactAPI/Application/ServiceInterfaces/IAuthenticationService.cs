using ChainImpactAPI.Dtos.Authentication;

namespace ChainImpactAPI.Application.ServiceInterfaces
{
    public interface IAuthenticationService
    {
        AuthenticationResponse LoginAsync(AuthenticationRequestDto loginRequestDto);

    }
}
