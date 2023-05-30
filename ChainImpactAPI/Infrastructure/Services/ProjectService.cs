using ChainImpactAPI.Application.RepositoryInterfaces;
using ChainImpactAPI.Application.ServiceInterfaces;
using ChainImpactAPI.Dtos;
using ChainImpactAPI.Dtos.SearchDtos;
using ChainImpactAPI.Models;

namespace ChainImpactAPI.Infrastructure.Services
{
    public class ProjectService : IProjectService
    {
        private readonly IConfiguration configuration;
        private readonly IProjectRepository projectRepository;

        public ProjectService(
            IConfiguration configuration,
            IProjectRepository projectRepository)
        {
            this.configuration = configuration;
            this.projectRepository = projectRepository;
        }

        public List<ProjectDto> GetProjects()
        {
            var projects = projectRepository.ListAllAsync().Result;

            var projectDtoList = new List<ProjectDto>();
            foreach (var project in projects)
            {
                projectDtoList.Add(new ProjectDto(
                        project.id,
                        new CharityDto(
                            project.charity.id,
                            project.charity.name,
                            project.charity.wallet,
                            project.charity.website,
                            project.charity.facebook,
                            project.charity.discord,
                            project.charity.twitter,
                            project.charity.imageurl,
                            project.charity.description,
                            project.charity.instagram,
                            project.charity.confirmed,
                            project.charity.email
                        ),
                        project.wallet,
                        project.name,
                        project.description,
                        project.financialgoal,
                        project.totaldonated,
                        project.totalbackers,
                        project.website,
                        project.facebook,
                        project.discord,
                        project.twitter,
                        project.instagram,
                        project.imageurl,
                        project.impactor == null ? null : new ImpactorDto(
                            project.impactor.id, 
                            project.impactor.wallet, 
                            project.impactor.name, 
                            project.impactor.description, 
                            project.impactor.website, 
                            project.impactor.facebook, 
                            project.impactor.discord, 
                            project.impactor.twitter, 
                            project.impactor.instagram, 
                            project.impactor.imageurl, 
                            project.impactor.role, 
                            project.impactor.type,
                            project.impactor.confirmed
                        ),
                        new CauseTypeDto(
                            project.primarycausetype.id,
                            project.primarycausetype.name
                        ), 
                        new CauseTypeDto(
                            project.secondarycausetype.id,
                            project.secondarycausetype.name
                        )
                    ));
            }

            return projectDtoList;
        }

        public List<ProjectDto> SearchProjects(GenericDto<ProjectSearchDto>? projectSearchDto)
        {
            var projects = projectRepository.SearchAsync(projectSearchDto).Result;

            var projectDtoList = new List<ProjectDto>();
            foreach (var project in projects)
            {
                projectDtoList.Add(new ProjectDto(
                        project.id,
                        new CharityDto(
                            project.charity.id,
                            project.charity.name,
                            project.charity.wallet,
                            project.charity.website,
                            project.charity.facebook,
                            project.charity.discord,
                            project.charity.twitter,
                            project.charity.imageurl,
                            project.charity.description,
                            project.charity.instagram,
                            project.charity.confirmed,
                            project.charity.email
                        ),
                        project.wallet,
                        project.name,
                        project.description,
                        project.financialgoal,
                        project.totaldonated,
                        project.totalbackers,
                        project.website,
                        project.facebook,
                        project.discord,
                        project.twitter,
                        project.instagram,
                        project.imageurl,
                        project.impactor == null ? null : new ImpactorDto(
                            project.impactor.id,
                            project.impactor.wallet,
                            project.impactor.name,
                            project.impactor.description,
                            project.impactor.website,
                            project.impactor.facebook,
                            project.impactor.discord,
                            project.impactor.twitter,
                            project.impactor.instagram,
                            project.impactor.imageurl,
                            project.impactor.role,
                            project.impactor.type,
                            project.impactor.confirmed
                        ),
                        new CauseTypeDto(
                            project.primarycausetype.id,
                            project.primarycausetype.name
                        ),
                        new CauseTypeDto(
                            project.secondarycausetype.id,
                            project.secondarycausetype.name
                        )
                    ));
            }

            return projectDtoList;
        }

    }
}
