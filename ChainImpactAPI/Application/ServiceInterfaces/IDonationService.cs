using ChainImpactAPI.Dtos;
using ChainImpactAPI.Dtos.BiggestDonations;
using ChainImpactAPI.Dtos.ImpactorsWithDonations;
using ChainImpactAPI.Dtos.RecentDonations;
using ChainImpactAPI.Dtos.SaveDonation;
using ChainImpactAPI.Models;

namespace ChainImpactAPI.Application.ServiceInterfaces
{
    public interface IDonationService
    {
        List<BiggestDonationsResponseDto> GetBiggestDonations(GenericDto<BiggestDonationsRequestDto>? biggestDonationsDto);
        List<ImpactorsWithDonationsResponseDto> GetImpactorsWithDonations(GenericDto<ImpactorsWithDonationsRequestDto>? impactorsWithDonationsDto);
        List<RecentDonationsResponseDto> GetRecentDonations(GenericDto<RecentDonationsRequestDto>? recentDonationsDto);
        Donation SaveDonaton(SaveDonationRequestDto saveDonationRequestDto);
        List<DonationDto> SearchDonations(GenericDto<DonationDto>? donationDto);
    }
}
