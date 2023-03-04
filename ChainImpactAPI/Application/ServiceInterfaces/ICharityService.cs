using ChainImpactAPI.Dtos.SearchDtos;
using ChainImpactAPI.Dtos;

namespace ChainImpactAPI.Application.ServiceInterfaces
{
    public interface ICharityService
    {
        List<CharityDto> SearchCharities(GenericDto<CharitySearchDto>? charitySearchDto);
    }
}
