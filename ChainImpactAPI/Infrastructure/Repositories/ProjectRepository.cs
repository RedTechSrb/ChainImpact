using ChainImpactAPI.Application.RepositoryInterfaces;
using ChainImpactAPI.Dtos;
using ChainImpactAPI.Dtos.ImpactorsWithDonations;
using ChainImpactAPI.Dtos.SearchDtos;
using ChainImpactAPI.Infrastructure.Repositories;
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

        public async Task<List<Project>> SearchAsync(GenericDto<ProjectSearchDto>? projectSearchDto)
        {
            var projects = await base.ListAllAsync(p => p.charity, p => p.impactor, p => p.primarycausetype, p => p.secondarycausetype);

            int? skip = null;
            int? take = null;
            ProjectSearchDto projectSearch = new ProjectSearchDto();

            if (projectSearchDto != null)
            {
                if (projectSearchDto.PageSize != null && projectSearchDto.PageNumber != null)
                {
                    skip = projectSearchDto.PageSize.Value * (projectSearchDto.PageNumber.Value - 1);
                    take = projectSearchDto.PageSize.Value;
                }
                projectSearch.id = projectSearchDto.Dto?.id;
            }

            if(projectSearch.id != null)
            {
                projects = projects.Where(p => p.id == projectSearch.id).ToList();
            }

            if (skip != null && take != null)
            {
                projects = projects.Skip(skip.Value).Take(take.Value).ToList();
            }


            return projects;
        }
    }
}