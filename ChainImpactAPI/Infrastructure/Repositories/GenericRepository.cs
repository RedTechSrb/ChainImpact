using ChainImpactAPI.Application.RepositoryInterfaces;
using ChainImpactAPI.Infrastructure;
using ChainImpactAPI.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace ChainImpactAPI.Infrastructure.Repositories
{
    public class GenericRepository<T> : IGenericRepository<T> where T : BaseEntity
    {
        protected readonly ApiDbContext context;

        public GenericRepository(ApiDbContext context)
        {
            this.context = context;
        }

        public async Task<List<T>> ListAllAsync(params Expression<Func<T, object>>[] includes)
        {
            var query = context.Set<T>().AsNoTracking();
            foreach (var inc in includes)
            {
                query = query.Include(inc);
            }

            return await query.ToListAsync();
        }

        public virtual async Task<List<T>> ListAllAsync()
        {
            return await context.Set<T>().ToListAsync();
        }
    }
}
