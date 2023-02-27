using ChainImpactAPI.Application.RepositoryInterfaces;
using ChainImpactAPI.Models;

namespace ChainImpactAPI.Infrastructure.Repositories
{
    public class DonationRepository : GenericRepository<Donation>, IDonationRepository
    {
        public DonationRepository(ApiDbContext context) : base(context)
        {
        }
    }
}
