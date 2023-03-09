using ChainImpactAPI.Application.RepositoryInterfaces;
using ChainImpactAPI.Application.ServiceInterfaces;
using ChainImpactAPI.Dtos;
using ChainImpactAPI.Dtos.ImpactorsWithDonations;
using ChainImpactAPI.Dtos.ImpactorsWithProjects;
using ChainImpactAPI.Dtos.NFT;
using ChainImpactAPI.Dtos.SearchDtos;
using ChainImpactAPI.Infrastructure.Repositories;
using ChainImpactAPI.Models;
using System.Collections.Generic;

namespace ChainImpactAPI.Infrastructure.Services
{
    public class ImpactorService : IImpactorService
    {
        private readonly IConfiguration configuration;
        private readonly IImpactorRepository impactorRepository;
        private readonly IDonationService donationService;
        private readonly IProjectService projectService;

        public ImpactorService(
            IConfiguration configuration,
            IImpactorRepository impactorRepository,
            IDonationService donationService,
            IProjectService projectService)
        {
            this.configuration = configuration;
            this.impactorRepository = impactorRepository;
            this.donationService = donationService;
            this.projectService = projectService;
        }

        public List<ImpactorDto> GetImpactors()
        {
            var impactors = impactorRepository.ListAllAsync().Result;

            var impactorDtoList = new List<ImpactorDto>();
            foreach (var impactor in impactors)
            {
                impactorDtoList.Add(new ImpactorDto(
                            impactor.id,
                            impactor.wallet,
                            impactor.name,
                            impactor.description,
                            impactor.website,
                            impactor.facebook,
                            impactor.discord,
                            impactor.twitter,
                            impactor.instagram,
                            impactor.imageurl,
                            impactor.role,
                            impactor.type
                        )
                );
            }

            return impactorDtoList;
        }

        public Impactor SaveImpactor(ImpactorDto impactorDto)
        {

            var impactor = impactorRepository.SearchAsync(new GenericDto<ImpactorDto>(new ImpactorDto { wallet = impactorDto.wallet })).Result.FirstOrDefault();
            if (impactor == null)
            {
                impactor= new Impactor(impactorDto.wallet, impactorDto.type.Value);
            } else
            {
                impactor.name = impactorDto.name != null ? impactorDto.name : impactor.name;
                impactor.description = impactorDto.description != null ? impactorDto.description : impactor.description;
                impactor.website = impactorDto.website != null ? impactorDto.website : impactor.website;
                impactor.facebook = impactorDto.facebook != null ? impactorDto.facebook : impactor.facebook;
                impactor.discord = impactorDto.discord != null ? impactorDto.discord : impactor.discord;
                impactor.twitter = impactorDto.twitter != null ? impactorDto.twitter : impactor.twitter;
                impactor.instagram = impactorDto.instagram != null ? impactorDto.instagram : impactor.instagram;
                impactor.imageurl = impactorDto.imageurl != null ? impactorDto.imageurl : impactor.imageurl;
                impactor.type = impactorDto.type != null ? impactorDto.type.Value : impactor.type;
                impactor.role = impactorDto.role != null ? impactorDto.role.Value : impactor.role;  
            }

            return impactorRepository.Save(impactor);
        }

        public List<ImpactorDto> SearchImpactors(GenericDto<ImpactorDto>? impactorSearchDto)
        {
            var impactors = impactorRepository.SearchAsync(impactorSearchDto).Result;

            var impactorDtoList = new List<ImpactorDto>();
            foreach (var impactor in impactors)
            {
                impactorDtoList.Add(new ImpactorDto(
                            impactor.id,
                            impactor.wallet,
                            impactor.name,
                            impactor.description,
                            impactor.website,
                            impactor.facebook,
                            impactor.discord,
                            impactor.twitter,
                            impactor.instagram,
                            impactor.imageurl,
                            impactor.role,
                            impactor.type
                        )
                );
            }

            return impactorDtoList;
        }

        public List<ImpactorsWithProjectsResponseDto> GetImpactorsWithProjects(GenericDto<ImpactorDto>? impactorsWithDonationsRequestDto)
        {
            var impactors = impactorRepository.SearchAsync(impactorsWithDonationsRequestDto).Result;

            var impactorsWithProjectsDtoList = new List<ImpactorsWithProjectsResponseDto>();
            foreach (var impactor in impactors)
            {
                var impactorDto = new ImpactorDto(
                            impactor.id,
                            impactor.wallet,
                            impactor.name,
                            impactor.description,
                            impactor.website,
                            impactor.facebook,
                            impactor.discord,
                            impactor.twitter,
                            impactor.instagram,
                            impactor.imageurl,
                            impactor.role,
                            impactor.type
                        );

                var donations = donationService.SearchDonations(new GenericDto<DonationDto>(new DonationDto { donator = impactorDto }));

                var donatedProjects = donations.GroupBy(d => new {
                                                d.project.id,
                                            }).Select(gpb => new DonatedProjectDto
                                            (
                                                projectService.SearchProjects(new GenericDto<ProjectSearchDto>(null, null, new ProjectSearchDto { id = gpb.Key.id })).FirstOrDefault(),
                                                gpb.Sum(d => d.amount.Value)
                                            )).OrderByDescending(iwp => iwp.totalDonation).ToList();

                impactorsWithProjectsDtoList.Add(
                    new ImpactorsWithProjectsResponseDto
                    (
                        impactorDto,
                        donatedProjects
                    ));
            }


            return impactorsWithProjectsDtoList;

        }

        public string GetSK()
        {
            return configuration["ChainImpactData:SK"];
        }
    }
}
