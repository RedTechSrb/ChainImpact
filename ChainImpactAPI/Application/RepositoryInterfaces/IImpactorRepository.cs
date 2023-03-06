using ChainImpactAPI.Dtos;
using ChainImpactAPI.Models;

namespace ChainImpactAPI.Application.RepositoryInterfaces
{
    public interface IImpactorRepository : IGenericRepository<Impactor>
    {
        Task<List<Impactor>> SearchAsync(GenericDto<ImpactorDto> genericDto);
    }
}
