using ChainImpactAPI.Application.RepositoryInterfaces;
using ChainImpactAPI.Models;

namespace ChainImpactAPI.Infrastructure.Repositories
{
    public class CauseTypeRepository : GenericRepository<CauseType>, ICauseTypeRepository
    {
        public CauseTypeRepository(ApiDbContext context) : base(context)
        {
        }
    }
}
