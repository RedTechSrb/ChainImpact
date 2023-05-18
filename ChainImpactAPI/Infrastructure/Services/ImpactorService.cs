using ChainImpactAPI.Application.RepositoryInterfaces;
using ChainImpactAPI.Application.ServiceInterfaces;
using ChainImpactAPI.Dtos;
using ChainImpactAPI.Dtos.ImpactorsWithDonations;
using ChainImpactAPI.Dtos.ImpactorsWithProjects;
using ChainImpactAPI.Dtos.NFT;
using ChainImpactAPI.Dtos.NFTLeft;
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
        private readonly IDonationRepository donationRepository;
        private readonly IProjectService projectService;
        private readonly INFTOwnerRepository nftOwnerRepository;

        public ImpactorService(
            IConfiguration configuration,
            IImpactorRepository impactorRepository,
            IDonationRepository donationRepository,
            IProjectService projectService,
            INFTOwnerRepository nftOwnerRepository)
        {
            this.configuration = configuration;
            this.impactorRepository = impactorRepository;
            this.donationRepository = donationRepository;
            this.projectService = projectService;
            this.nftOwnerRepository = nftOwnerRepository;
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
                impactor.name = impactorDto.name;
                impactor.description = impactorDto.description;
                impactor.website = impactorDto.website;
                impactor.facebook = impactorDto.facebook;
                impactor.discord = impactorDto.discord;
                impactor.twitter = impactorDto.twitter;
                impactor.instagram = impactorDto.instagram;
                impactor.imageurl = impactorDto.imageurl;
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

                var donations = donationRepository.SearchAsync(new GenericDto<DonationDto>(null, null, new DonationDto { donator = impactorDto })).Result;

                var donatedProjects = donations.GroupBy(d => new {
                                                d.project.id,
                                            }).Select(gpb => new DonatedProjectDto
                                            (
                                                projectService.SearchProjects(new GenericDto<ProjectSearchDto>(null, null, new ProjectSearchDto { id = gpb.Key.id })).FirstOrDefault(),
                                                gpb.Sum(d => d.amount)
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

        public List<NFTTypeDto> GetImpactorsWithNFTs(ImpactorDto impactorDto)
        {
            var impactor = this.SearchImpactors(new GenericDto<ImpactorDto>(null, null, impactorDto)).FirstOrDefault();
            var nftowners = nftOwnerRepository.SearchAsync(new GenericDto<NFTOwnerDto>(null, null, new NFTOwnerDto { impactor = new ImpactorDto { id = impactor.id } })).Result;


            var nfttypeDtoList = new List<NFTTypeDto>();
            foreach (var nftowner in nftowners)
            {
                nfttypeDtoList.Add(new NFTTypeDto(
                                        nftowner.nfttype.id,
                                        nftowner.nfttype.tier,
                                        nftowner.nfttype.usertype,
                                        new CauseTypeDto(
                                            nftowner.nfttype.causetype.id,
                                            nftowner.nfttype.causetype.name
                                        ),
                                        nftowner.nfttype.imageurl,
                                        nftowner.nfttype.minimaldonation,
                                        nftowner.nfttype.symbol,
                                        nftowner.nfttype.description
                                    ));
            }

            return nfttypeDtoList;
        }
    }
}
