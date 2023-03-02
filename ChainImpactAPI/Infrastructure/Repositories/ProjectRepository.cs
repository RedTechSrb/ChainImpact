using ChainImpactAPI.Application.RepositoryInterfaces;
using ChainImpactAPI.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace ChainImpactAPI.Infrastructure.Repositories
{
    public class ProjectRepository : GenericRepository<Project>, IProjectRepository
    {
        public ProjectRepository(ApiDbContext context) : base(context)
        {
        }

        override
        public async Task<List<Project>> ListAllAsync()
        {
            return await base.ListAllAsync(p => p.charity, p => p.impactor, p => p.primarycausetype, p => p.secondarycausetype);
        }

    }
}
