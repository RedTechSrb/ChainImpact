using ChainImpactAPI.Dtos.SearchDtos;
using ChainImpactAPI.Dtos;
using ChainImpactAPI.Models;

namespace ChainImpactAPI.Application.ServiceInterfaces
{
    public interface ICharityService
    {
        Charity SaveCharity(CharityDto charityDto);
        List<CharityDto> SearchCharities(GenericDto<CharityDto>? charityDto);
    }
}
