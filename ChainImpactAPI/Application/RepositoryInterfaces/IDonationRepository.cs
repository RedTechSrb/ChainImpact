using ChainImpactAPI.Dtos.ImpactorsWithDonations;
using ChainImpactAPI.Dtos.SearchDtos;
using ChainImpactAPI.Models;
using System.Linq.Expressions;

namespace ChainImpactAPI.Application.RepositoryInterfaces
{
    public interface IDonationRepository : IGenericRepository<Donation>
    {
        Task<List<Donation>> SearchDonationsAsync(DonationSearchDto donationSearchDto, Expression<Func<BaseEntity, object>>[] relations);
        Task<List<ImpactorsWithDonationsResponseDto>> SearchDonationsGroupedByImpactorsAsync(DonationSearchDto donationSearchDto);

    }
}
