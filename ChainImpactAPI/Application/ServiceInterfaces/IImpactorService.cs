using ChainImpactAPI.Dtos;
using ChainImpactAPI.Models;

namespace ChainImpactAPI.Application.ServiceInterfaces
{
    public interface IImpactorService
    {
        List<ImpactorDto> GetImpactors();
        Impactor SaveImpactor(ImpactorDto impactorDto);
        List<ImpactorDto> SearchImpactors(GenericDto<ImpactorDto>? impactorSearchDto);
    }
}
