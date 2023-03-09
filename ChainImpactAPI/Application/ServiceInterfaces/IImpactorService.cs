using ChainImpactAPI.Dtos;
using ChainImpactAPI.Dtos.ImpactorsWithProjects;
using ChainImpactAPI.Models;

namespace ChainImpactAPI.Application.ServiceInterfaces
{
    public interface IImpactorService
    {
        List<ImpactorDto> GetImpactors();
        List<ImpactorsWithProjectsResponseDto> GetImpactorsWithProjects(GenericDto<ImpactorDto>? impactorsWithDonationsRequestDto);
        string GetSK();
        Impactor SaveImpactor(ImpactorDto impactorDto);
        List<ImpactorDto> SearchImpactors(GenericDto<ImpactorDto>? impactorSearchDto);
    }
}
