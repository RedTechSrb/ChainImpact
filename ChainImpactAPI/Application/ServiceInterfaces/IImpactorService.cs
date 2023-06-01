using ChainImpactAPI.Dtos;
using ChainImpactAPI.Dtos.ImpactorsWithProjects;
using ChainImpactAPI.Models;

namespace ChainImpactAPI.Application.ServiceInterfaces
{
    public interface IImpactorService
    {
        List<ImpactorDto> GetImpactors();
        List<NFTTypeDto> GetImpactorsWithNFTs(ImpactorDto impactorDto);
        List<ImpactorsWithProjectsResponseDto> GetImpactorsWithProjects(GenericDto<ImpactorDto>? impactorsWithDonationsRequestDto);
        Impactor SaveImpactor(ImpactorDto impactorDto);
        Impactor UpdateImpactor(ImpactorDto impactorDto);
        Impactor RegisterImpactor(ImpactorDto impactorDto);
        List<ImpactorDto> SearchImpactors(GenericDto<ImpactorDto>? impactorSearchDto);
    }
}
