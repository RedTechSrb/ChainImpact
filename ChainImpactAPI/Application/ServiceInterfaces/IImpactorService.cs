using ChainImpactAPI.Dtos;
using ChainImpactAPI.Dtos.ImpactorWithWallet;
using ChainImpactAPI.Models;

namespace ChainImpactAPI.Application.ServiceInterfaces
{
    public interface IImpactorService
    {
        List<ImpactorDto> GetImpactors();
        Impactor SaveImpactor(ImpactorDto impactorDto);
        ImpactorDto? GetImpactorWithWallet(ImpactorWithWalletRequestDto impactorWithWalletRequestDto);
    }
}
