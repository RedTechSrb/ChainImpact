using ChainImpactAPI.Models;
using System.Linq.Expressions;

namespace ChainImpactAPI.Application.RepositoryInterfaces
{
    public interface IGenericRepository<T> where T : BaseEntity
    {
        Task<List<T>> ListAllAsync();
        Task<List<T>> ListAllAsync(params Expression<Func<T, object>>[] includes);

        T Update(T entity);
        T Delete(T entity);
    }
}
