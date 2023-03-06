using ChainImpactAPI.Dtos;
using ChainImpactAPI.Dtos.NFT;
using ChainImpactAPI.Dtos.SearchDtos;

namespace ChainImpactAPI.Application.ServiceInterfaces
{
    public interface ICauseTypeService
    {
        List<CauseTypeDto> SearchCauseTypes(GenericDto<CauseTypeDto>? causeTypeDto);
    }
}
