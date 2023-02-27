using ChainImpactAPI.Dtos;

namespace ChainImpactAPI.Application.ServiceInterfaces
{
    public interface IImpactorService
    {
        List<ImpactorDto> GetImpactors();
    }
}
