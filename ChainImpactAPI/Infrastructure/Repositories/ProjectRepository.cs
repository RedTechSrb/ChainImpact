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

        public async Task<List<Project>> SearchAsync(GenericDto<ProjectDto>? projectSearchDto)
        {
            var projects = await base.ListAllAsync(p => p.charity, p => p.impactor, p => p.primarycausetype, p => p.secondarycausetype);

            int? skip = null;
            int? take = null;
            ProjectDto projectSearch = new ProjectDto();

            if (projectSearchDto != null)
            {
                if (projectSearchDto.PageSize != null && projectSearchDto.PageNumber != null)
                {
                    skip = projectSearchDto.PageSize.Value * (projectSearchDto.PageNumber.Value - 1);
                    take = projectSearchDto.PageSize.Value;
                }
                if (projectSearchDto.Dto != null)
                {
                    projectSearch = projectSearchDto.Dto;
                }
            }

            if(projectSearch.id != null)
            {
                projects = projects.Where(p => p.id == projectSearch.id).ToList();
            }
            if (projectSearch.name != null)
            {
                projects = projects.Where(p => p.name == projectSearch.name).ToList();
            }
            if (projectSearch.wallet != null)
            {
                projects = projects.Where(p => p.wallet == projectSearch.wallet).ToList();
            }
            if (projectSearch.description != null)
            {
                projects = projects.Where(p => p.description == projectSearch.description).ToList();
            }
            if (projectSearch.financialgoal != null)
            {
                projects = projects.Where(p => p.financialgoal == projectSearch.financialgoal).ToList();
            }
            if (projectSearch.totaldonated != null)
            {
                projects = projects.Where(p => p.totaldonated == projectSearch.totaldonated).ToList();
            }
            if (projectSearch.totalbackers != null)
            {
                projects = projects.Where(p => p.totalbackers == projectSearch.totalbackers).ToList();
            }
            if (projectSearch.website != null)
            {
                projects = projects.Where(p => p.website == projectSearch.website).ToList();
            }
            if (projectSearch.facebook != null)
            {
                projects = projects.Where(p => p.facebook == projectSearch.facebook).ToList();
            }
            if (projectSearch.discord != null)
            {
                projects = projects.Where(p => p.discord == projectSearch.discord).ToList();
            }
            if (projectSearch.twitter != null)
            {
                projects = projects.Where(p => p.twitter == projectSearch.twitter).ToList();
            }
            if (projectSearch.instagram != null)
            {
                projects = projects.Where(p => p.instagram == projectSearch.instagram).ToList();
            }
            if (projectSearch.imageurl != null)
            {
                projects = projects.Where(p => p.imageurl == projectSearch.imageurl).ToList();
            }
            if (projectSearch.confirmed != null)
            {
                projects = projects.Where(p => p.confirmed == projectSearch.confirmed).ToList();
            }

            if (projectSearch.charity != null)
            {
                projects = projects.Where(p => p.charity.id == projectSearch.charity.id).ToList();
            }
            if (projectSearch.primarycausetype != null)
            {
                projects = projects.Where(p => p.primarycausetype.id == projectSearch.primarycausetype.id).ToList();
            }
            if (projectSearch.secondarycausetype != null)
            {
                projects = projects.Where(p => p.secondarycausetype.id == projectSearch.secondarycausetype.id).ToList();
            }
            if (projectSearch.angelimpactor != null)
            {
                projects = projects.Where(p => (p.impactor != null && p.impactor.id == projectSearch.angelimpactor.id)).ToList();
            }


            if (skip != null && take != null)
            {
                projects = projects.Skip(skip.Value).Take(take.Value).ToList();
            }


            return projects;
        }
    }
}