using ChainImpactAPI.Application.RepositoryInterfaces;
using ChainImpactAPI.Models;

namespace ChainImpactAPI.Infrastructure.Repositories
{
    public class ImpactorRepository : GenericRepository<Impactor>, IImpactorRepository
    {
        public ImpactorRepository(ApiDbContext context) : base(context)
        {
        }
    }
}
