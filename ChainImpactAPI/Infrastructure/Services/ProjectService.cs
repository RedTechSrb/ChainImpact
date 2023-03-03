using ChainImpactAPI.Application.RepositoryInterfaces;
using ChainImpactAPI.Application.ServiceInterfaces;
using ChainImpactAPI.Dtos;

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
                            project.charity.description,
                            project.charity.discord,
                            project.charity.facebook, 
                            project.charity.imageurl, 
                            project.charity.twitter,   
                            project.charity.wallet, 
                            project.charity.website
                        ),
                        project.name,
                        project.description,
                        project.milestones,
                        project.financialgoal,
                        project.totaldonated,
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
                            project.impactor.type
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
