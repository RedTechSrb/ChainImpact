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



        public T Update(T entity)
        {

            var existingItem = context.Set<T>().Find(entity.id);


            if (existingItem != null)
            {
                context.Entry(existingItem).CurrentValues.SetValues(entity);
                context.Entry(existingItem).State = EntityState.Modified;
            }
            else
            {
                context.Set<T>().Add(entity);
                context.Entry(entity).State = EntityState.Added;
            }

            context.SaveChanges();
            return entity;

        }

        public T Delete(T entity)
        {
            throw new NotImplementedException();
        }

        
        virtual public T Save(T entity)
        {
            if (entity.id != 0)
            {
                context.Entry(entity).CurrentValues.SetValues(entity);
                context.Entry(entity).State = EntityState.Modified;
            }
            else
            {
                context.Set<T>().Add(entity);
                context.Entry(entity).State = EntityState.Added;
            }

            context.SaveChanges();
            return entity;
        }
    }
}
