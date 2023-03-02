using ChainImpactAPI.Application.RepositoryInterfaces;
using ChainImpactAPI.Models;

namespace ChainImpactAPI.Infrastructure.Repositories
{
    public class NFTTypeRepository : GenericRepository<NFTType>, INFTTypeRepository
    {
        public NFTTypeRepository(ApiDbContext context) : base(context)
        {
        }

        override
        public async Task<List<NFTType>> ListAllAsync()
        {
            return await base.ListAllAsync(nft => nft.causetype);
        }

    }
}
