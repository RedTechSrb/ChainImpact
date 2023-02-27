using ChainImpactAPI.Application.RepositoryInterfaces;
using ChainImpactAPI.Models;

namespace ChainImpactAPI.Infrastructure.Repositories
{
    public class CharityRepository : GenericRepository<Charity>, ICharityRepository
    {
        public CharityRepository(ApiDbContext context) : base(context)
        {
        }
    }
}
