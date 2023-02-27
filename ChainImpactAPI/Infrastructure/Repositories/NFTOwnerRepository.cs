using ChainImpactAPI.Application.RepositoryInterfaces;
using ChainImpactAPI.Models;

namespace ChainImpactAPI.Infrastructure.Repositories
{
    public class NFTOwnerRepository : GenericRepository<NFTOwner>, INFTOwnerRepository
    {
        public NFTOwnerRepository(ApiDbContext context) : base(context)
        {
        }
    }
}
