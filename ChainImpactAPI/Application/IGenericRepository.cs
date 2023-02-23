using ChainImpactAPI.Models;

namespace ChainImpactAPI.Application
{
    public interface IGenericRepository<T> where T : BaseEntity
    {
        Task<List<T>> ListAllAsync();
    }
}
