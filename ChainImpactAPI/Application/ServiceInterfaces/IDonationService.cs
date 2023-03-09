using ChainImpactAPI.Dtos;
using ChainImpactAPI.Dtos.ImpactorsWithDonations;
using ChainImpactAPI.Dtos.RecentDonations;

namespace ChainImpactAPI.Application.ServiceInterfaces
{
    public interface IDonationService
    {
        List<ImpactorsWithDonationsResponseDto> GetImpactorsWithDonations(GenericDto<ImpactorsWithDonationsRequestDto>? impactorsWithDonationsDto);
        List<RecentDonationsResponseDto> GetRecentDonations(GenericDto<RecentDonationsRequestDto>? recentDonationsDto);
        List<DonationDto> SearchDonations(GenericDto<DonationDto>? donationDto);
    }
}
