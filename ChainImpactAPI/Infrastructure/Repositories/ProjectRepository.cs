using ChainImpactAPI.Application.RepositoryInterfaces;
using ChainImpactAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace ChainImpactAPI.Infrastructure.Repositories
{
    public class ProjectRepository : GenericRepository<Project>, IProjectRepository
    {
        public ProjectRepository(ApiDbContext context) : base(context)
        {
        }
/*
        override
        public async Task<List<Project>> ListAllAsync()
        {
            return await context.project.Include(p => p.charity)
                                        .Include(p => p.impactor)
                                        .Include(p => p.primarycausetype)
                                        .Include(p => p.secondarycausetype)
                                        .ToListAsync();
        }
*/
    }
}
