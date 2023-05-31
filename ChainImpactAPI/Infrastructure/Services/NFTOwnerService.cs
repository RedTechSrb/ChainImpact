using ChainImpactAPI.Application.RepositoryInterfaces;
using ChainImpactAPI.Application.ServiceInterfaces;
using ChainImpactAPI.Dtos.NFT;
using ChainImpactAPI.Dtos.NFTOwns;
using ChainImpactAPI.Dtos;
using Microsoft.AspNetCore.Mvc;
using ChainImpactAPI.Dtos.NFTLeft;
using ChainImpactAPI.Dtos.SearchDtos;
using ChainImpactAPI.Models;

namespace ChainImpactAPI.Infrastructure.Services
{
    public class NFTOwnerService : INFTOwnerService
    {
        private readonly IConfiguration configuration;
        private readonly INFTOwnerRepository nFTOwnerRepository;
        private readonly IImpactorService impactorService;
        private readonly IProjectService projectService;
        private readonly ICauseTypeService causeTypeService;
        private readonly INFTTypeService nftTypeService;
        public NFTOwnerService(
            IConfiguration configuration,
            INFTOwnerRepository nFTOwnerRepository,
            IImpactorService impactorService,
            IProjectService projectService,
            ICauseTypeService causeTypeService,
            INFTTypeService nftTypeService)
        {
            this.configuration = configuration;
            this.nFTOwnerRepository = nFTOwnerRepository;
            this.impactorService = impactorService;
            this.projectService = projectService;
            this.causeTypeService = causeTypeService;
            this.nftTypeService = nftTypeService;
        }

        public List<NFTLeftResponseDto> NFTLeft(NFTLeftRequestDto nftLeftRequestDto)
        {
            var impactor = impactorService.SearchImpactors(new GenericDto<ImpactorDto>(null, null, new ImpactorDto { wallet = nftLeftRequestDto.wallet })).FirstOrDefault();
            var impactorWithProjects = impactorService.GetImpactorsWithProjects(new GenericDto<ImpactorDto>(null, null, new ImpactorDto { wallet = nftLeftRequestDto.wallet })).FirstOrDefault();

            var project = projectService.SearchProjects(new GenericDto<ProjectDto>(null, null, new ProjectDto { id = nftLeftRequestDto.projectid })).FirstOrDefault();

            var primaryCauseType = causeTypeService.SearchCauseTypes(new GenericDto<CauseTypeDto>(new CauseTypeDto { name = project.primarycausetype.name })).FirstOrDefault();
            var nftPrimaryTypes = nftTypeService.SearchNFTs(new GenericDto<NFTTypeDto>(null, null, new NFTTypeDto { causetype = primaryCauseType, usertype = impactor.type }));


            double generalDonationAmount = 0.0;
            double primaryCauseTypeAmount = 0.0;

            foreach (var impactorWithProject in impactorWithProjects.donatedProjects)
            {
                generalDonationAmount = generalDonationAmount + impactorWithProject.totalDonation.Value;

                if (impactorWithProject.project.primarycausetype.name == primaryCauseType.name)
                {
                    primaryCauseTypeAmount = primaryCauseTypeAmount + impactorWithProject.totalDonation.Value;
                }
            }


            var nftLeftList = new List<NFTLeftResponseDto>();

            foreach (var nftprimarytype in nftPrimaryTypes)
            {
                var specificNFTOfImpactor = nFTOwnerRepository.SearchAsync(new GenericDto<NFTOwnerDto>(null, null, new NFTOwnerDto
                {
                    impactor = impactor,
                    nfttype = nftprimarytype,
                })).Result.FirstOrDefault();

                if (specificNFTOfImpactor == null && nftLeftList.Count == 0)
                {
                    nftLeftList.Add(new NFTLeftResponseDto
                    {
                        amountleft = nftprimarytype.minimaldonation.Value - primaryCauseTypeAmount,
                        imageurl = nftprimarytype.imageurl,
                        tier = nftprimarytype.tier.Value
                    });
                }
            }

            var generalCauseType = causeTypeService.SearchCauseTypes(new GenericDto<CauseTypeDto>(new CauseTypeDto { name = "general" })).FirstOrDefault();
            var nftGeneralTypes = nftTypeService.SearchNFTs(new GenericDto<NFTTypeDto>(null, null, new NFTTypeDto { causetype = generalCauseType, usertype = impactor.type }));

            foreach (var nftgeneraltype in nftGeneralTypes)
            {
                var specificNFTOfImpactor = nFTOwnerRepository.SearchAsync(new GenericDto<NFTOwnerDto>(null, null, new NFTOwnerDto
                {
                    impactor = impactor,
                    nfttype = nftgeneraltype,
                })).Result.FirstOrDefault();

                if (specificNFTOfImpactor == null && nftLeftList.Count == 1)
                {
                    nftLeftList.Add(new NFTLeftResponseDto
                    {
                        amountleft = nftgeneraltype.minimaldonation.Value - generalDonationAmount,
                        imageurl = nftgeneraltype.imageurl,
                        tier = nftgeneraltype.tier.Value
                    });
                }
            }



            return nftLeftList;

        }

        public List<NFTOwnsResponseDto> NFTOwns(NFTOwnsRequestDto nftOwnsRequestDto)
        {
            var impactor = impactorService.SearchImpactors(new GenericDto<ImpactorDto>(null, null, new ImpactorDto { wallet = nftOwnsRequestDto.wallet })).FirstOrDefault();
            
            var myNFTs = nFTOwnerRepository.SearchAsync(new GenericDto<NFTOwnerDto>(null, null, new NFTOwnerDto
            {
                impactor = impactor,
            })).Result.FirstOrDefault();

            var NFTOwned = new List<NFTOwnsResponseDto>();

            if (myNFTs == null)
            {
                return NFTOwned;
            }

            /*foreach(var myNFT in myNFTs)
            {

            }*/
            NFTOwned.Add(new NFTOwnsResponseDto("ASD", "ASD", 0));

            return NFTOwned;
        
        }

        public List<NFTOwnerDto> SearchNftOwners(GenericDto<NFTOwnerDto> genericDto)
        {
            var nftowners = nFTOwnerRepository.SearchAsync(genericDto).Result;

            var nftOwnerDtoList = new List<NFTOwnerDto>();
            foreach (var nftowner in nftowners)
            {
                nftOwnerDtoList.Add(new NFTOwnerDto(
                        nftowner.id,
                        new NFTTypeDto(
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
                        ), 
                        new ImpactorDto(
                            nftowner.impactor.id,
                            nftowner.impactor.wallet,
                            nftowner.impactor.name,
                            nftowner.impactor.description,
                            nftowner.impactor.website,
                            nftowner.impactor.facebook,
                            nftowner.impactor.discord,
                            nftowner.impactor.twitter,
                            nftowner.impactor.instagram,
                            nftowner.impactor.imageurl,
                            nftowner.impactor.role,
                            nftowner.impactor.type,
                            nftowner.impactor.confirmed,
                            nftowner.impactor.password,
                            nftowner.impactor.username,
                            nftowner.impactor.email
                            )
                    ));
            }
            return nftOwnerDtoList;

        }
    }
}
