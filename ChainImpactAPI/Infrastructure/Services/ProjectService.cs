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
            var projects = projectRepository.ListAllAsync(p => p.charity, p => p.impactor, p => p.primarycausetype, p => p.secondarycausetype).Result;

            var projectDtoList = new List<ProjectDto>();
            foreach (var project in projects)
            {
                projectDtoList.Add(new ProjectDto(
                        project.id,
                        project.charity,
                        project.name,
                        project.description,
                        project.milestones,
                        project.finantialgoal,
                        project.totaldonated,
                        project.website,
                        project.facebook,
                        project.discord,
                        project.twitter,
                        project.instagram,
                        project.imageurl,
                        project.impactor,
                        project.primarycausetype,
                        project.secondarycausetype)
                    );
            }

            return projectDtoList;
        }
    }
}
