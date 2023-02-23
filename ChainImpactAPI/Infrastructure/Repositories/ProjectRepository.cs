using ChainImpactAPI.Application.RepositoryInterfaces;
using ChainImpactAPI.Models;

namespace ChainImpactAPI.Infrastructure.Repositories
{
    public class ProjectRepository : GenericRepository<Project>, IProjectRepository
    {
        public ProjectRepository(ApiDbContext context) : base(context)
        {
        }

    }
}
