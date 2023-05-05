using ChainImpactAPI.Application.RepositoryInterfaces;
using ChainImpactAPI.Dtos;
using ChainImpactAPI.Models;

namespace ChainImpactAPI.Infrastructure.Repositories
{
    public class MilestoneRepository : GenericRepository<Milestone>, IMilestoneRepository
    {
        public MilestoneRepository(ApiDbContext context) : base(context)
        {
        }

        public async Task<List<Milestone>> SearchAsync(GenericDto<MilestoneDto>? milestoneSearchDto)
        {
            var milestones = await base.ListAllAsync(m => m.project);

            int? skip = null;
            int? take = null;
            MilestoneDto milestoneSearch = new MilestoneDto();

            if (milestoneSearchDto != null)
            {
                if (milestoneSearchDto.PageSize != null && milestoneSearchDto.PageNumber != null)
                {
                    skip = milestoneSearchDto.PageSize.Value * (milestoneSearchDto.PageNumber.Value - 1);
                    take = milestoneSearchDto.PageSize.Value;
                }
                if (milestoneSearchDto.Dto != null)
                {
                    milestoneSearch = milestoneSearchDto.Dto;
                }
            }

            if (milestoneSearch.id != null)
            {
                milestones = milestones.Where(t => t.id == milestoneSearch.id).ToList();
            }
            if (milestoneSearch.name != null)
            {
                milestones = milestones.Where(t => t.name == milestoneSearch.name).ToList();
            }
            if (milestoneSearch.description != null)
            {
                milestones = milestones.Where(t => t.description == milestoneSearch.description).ToList();
            }
            if (milestoneSearch.complete != null)
            {
                milestones = milestones.Where(t => t.complete == milestoneSearch.complete).ToList();
            }
            if (milestoneSearch.project != null)
            {
                milestones = milestones.Where(t => t.project.id == milestoneSearch.project.id).ToList();
            }

            milestones = milestones.OrderBy(t => t.complete).ToList();

            if (skip != null && take != null)
            {
                milestones = milestones.Skip(skip.Value).Take(take.Value).ToList();
            }

            return milestones;

        }


    }
}
