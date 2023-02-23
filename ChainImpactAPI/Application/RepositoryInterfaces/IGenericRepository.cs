using ChainImpactAPI.Models;

namespace ChainImpactAPI.Application.RepositoryInterfaces
{
    public interface IGenericRepository<T> where T : BaseEntity
    {
        Task<List<T>> ListAllAsync();
    }
}
