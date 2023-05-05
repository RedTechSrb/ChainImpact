using ChainImpactAPI.Dtos;
using ChainImpactAPI.Models;

namespace ChainImpactAPI.Application.RepositoryInterfaces
{
    public interface IMilestoneRepository : IGenericRepository<Milestone>
    {
        Task<List<Milestone>> SearchAsync(GenericDto<MilestoneDto>? milestoneDto);
    }
}
