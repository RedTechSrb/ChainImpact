using ChainImpactAPI.Application.RepositoryInterfaces;
using ChainImpactAPI.Application.ServiceInterfaces;
using ChainImpactAPI.Dtos;
using ChainImpactAPI.Dtos.SaveDonation;
using ChainImpactAPI.Dtos.SearchDtos;
using ChainImpactAPI.Models;

namespace ChainImpactAPI.Infrastructure.Services
{
    public class ProjectService : IProjectService
    {
        private readonly IConfiguration configuration;
        private readonly IProjectRepository projectRepository;
        private readonly ICharityService charityService;
        private readonly ICauseTypeService causeTypeService;

        public ProjectService(
            IConfiguration configuration,
            IProjectRepository projectRepository,
            ICharityService charityService,
            ICauseTypeService causeTypeService)
        {
            this.configuration = configuration;
            this.projectRepository = projectRepository;
            this.charityService = charityService;
            this.causeTypeService = causeTypeService;
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
                        ),
                        project.confirmed
                    ));
            }

            return projectDtoList;
        }

        public List<ProjectDto> SearchProjects(GenericDto<ProjectDto>? projectDto)
        {
            var projects = projectRepository.SearchAsync(projectDto).Result;

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
                        ),
                        project.confirmed
                    ));
            }

            return projectDtoList;
        }

        public Project SaveProject(ProjectDto projectDto)
        {
            var charity = charityService.SearchCharities(new GenericDto<CharityDto>(new CharityDto { wallet = projectDto.charity.wallet })).FirstOrDefault();
            var project = projectRepository.SearchAsync(new GenericDto<ProjectDto>(new ProjectDto { name = projectDto.name })).Result.FirstOrDefault();

            var primaryType = causeTypeService.SearchCauseTypes(new GenericDto<CauseTypeDto>(new CauseTypeDto { name = projectDto.primarycausetype.name })).FirstOrDefault();
            var secondaryType = causeTypeService.SearchCauseTypes(new GenericDto<CauseTypeDto>(new CauseTypeDto { name = projectDto.secondarycausetype.name })).FirstOrDefault();

            var charityForProject = new Charity();

            if (charity == null)
            {
                // New charity - save it
                var charityForSave = new CharityDto
                {
                    confirmed = false,
                    imageurl = projectDto.charity.imageurl,
                    description= projectDto.charity.description,
                    discord = projectDto.charity.discord,
                    email = projectDto.charity.email,
                    facebook = projectDto.charity.facebook,
                    instagram = projectDto.charity.instagram,
                    name = projectDto.charity.name,
                    twitter = projectDto.charity.twitter,
                    wallet = projectDto.charity.wallet,
                    website = projectDto.charity.website,
                };

                charityForProject = charityService.SaveCharity(charityForSave);
            }
            else
            {
                // existing charity, just save project to it
                charityForProject = new Charity
                {
                    confirmed = charity.confirmed.Value,
                    imageurl = charity.imageurl,
                    description = charity.description,
                    discord = charity.discord,
                    email = charity.email,
                    facebook = charity.facebook,
                    instagram = charity.instagram,
                    name = charity.name,
                    twitter = charity.twitter,
                    wallet = charity.wallet,
                    website = charity.website,
                    id = charity.id.Value,
                };

            }

            if (project == null)
            {
                var projectForSave = new Project
                {
                    name = projectDto.name,
                    charityid = charityForProject.id,
                    confirmed = false,
                    totaldonated = 0,
                    totalbackers = 0,
                    primarycausetypeid = primaryType.id.Value,
                    secondarycausetypeid = secondaryType.id.Value,
                    description = projectDto.description,
                    imageurl = projectDto.imageurl,
                    impactorid = null,
                    twitter = projectDto.twitter,
                    // wallet = projectDto.wallet, // This will be changed in the further improvements
                    wallet = charityForProject.wallet, // Project has the same wallet as charity
                    instagram = projectDto.instagram,
                    discord = projectDto.discord,
                    facebook = projectDto.facebook,
                    website = projectDto.website,
                    financialgoal = projectDto.financialgoal.Value,

                };
                return projectRepository.Save(projectForSave);
            } 
            else
            {
                throw new Exception("Update project ...");
            }

        }


    }
}
