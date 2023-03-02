using ChainImpactAPI.Dtos;
using ChainImpactAPI.Dtos.ImpactorsWithDonations;

namespace ChainImpactAPI.Application.ServiceInterfaces
{
    public interface IDonationService
    {
        List<ImpactorsWithDonationsResponseDto> GetImpactorsWithDonations(GenericDto<ImpactorsWithDonationsRequestDto>? impactorsWithDonationsDto);

    }
}
