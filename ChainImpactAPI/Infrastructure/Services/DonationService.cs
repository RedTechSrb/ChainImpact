using ChainImpactAPI.Application.RepositoryInterfaces;
using ChainImpactAPI.Application.ServiceInterfaces;
using ChainImpactAPI.Dtos;
using ChainImpactAPI.Dtos.ImpactorsWithDonations;
using ChainImpactAPI.Dtos.NFT;
using ChainImpactAPI.Dtos.RecentDonations;
using ChainImpactAPI.Dtos.SearchDtos;
using ChainImpactAPI.Infrastructure.Repositories;
using ChainImpactAPI.Models;

namespace ChainImpactAPI.Infrastructure.Services
{
    public class DonationService : IDonationService
    {
        private readonly IConfiguration configuration;
        private readonly IDonationRepository donationRepository;

        public DonationService(
            IConfiguration configuration,
            IDonationRepository donationRepository)
        {
            this.configuration = configuration;
            this.donationRepository = donationRepository;
        }

        public List<ImpactorsWithDonationsResponseDto> GetImpactorsWithDonations(GenericDto<ImpactorsWithDonationsRequestDto>? impactorsWithDonationsDto)
        {
            int? skip = null; 
            int? take = null;
            DonationSearchDto donationSearchDto = new DonationSearchDto();

            if (impactorsWithDonationsDto != null)
            {
                if (impactorsWithDonationsDto.PageSize != null && impactorsWithDonationsDto.PageNumber != null)
                {
                    skip = impactorsWithDonationsDto.PageSize.Value * (impactorsWithDonationsDto.PageNumber.Value - 1);
                    take = impactorsWithDonationsDto.PageSize.Value;
                }

                donationSearchDto.projectType = impactorsWithDonationsDto.Dto?.projectType;
            }

            List<ImpactorsWithDonationsResponseDto> impactorsWithDonationsDtoList = donationRepository.SearchDonationsGroupedByImpactorsAsync(donationSearchDto).Result;

            if(skip != null && take != null)
            {
                impactorsWithDonationsDtoList = impactorsWithDonationsDtoList.Skip(skip.Value).Take(take.Value).ToList();
            }

            return impactorsWithDonationsDtoList;

        }

        public List<RecentDonationsResponseDto> GetRecentDonations(GenericDto<RecentDonationsRequestDto>? recentDonationsDto)
        {
            int? skip = null;
            int? take = null;
            List<Donation> donations = null;

            if (recentDonationsDto != null)
            {
                if (recentDonationsDto.PageSize != null && recentDonationsDto.PageNumber != null)
                {
                    skip = recentDonationsDto.PageSize.Value * (recentDonationsDto.PageNumber.Value - 1);
                    take = recentDonationsDto.PageSize.Value;
                }

                if (recentDonationsDto.Dto != null)
                {
                    donations = donationRepository.SearchAsync(new GenericDto<DonationDto>(null, null, new DonationDto { project = new ProjectDto { id = recentDonationsDto.Dto.projectid } })).Result;
                }
            }

            // TODO: Recent donations are returned, if someone donated twice in the recent period, he will be in the retunred list twice. 
            // TODO: Probably, this should be fixed to group recent users

            donations = donations.OrderBy(d => d.id).ToList();

            if (skip != null && take != null)
            {
                donations = donations.Skip(skip.Value).Take(take.Value).ToList();
            }


            var recentImpactors= new List<RecentDonationsResponseDto>();
            foreach (var donation in donations)
            {
                recentImpactors.Add(new RecentDonationsResponseDto
                {
                    impactor = new ImpactorDto(
                                            donation.donator.id, 
                                            donation.donator.wallet,
                                            donation.donator.name,
                                            donation.donator.description,
                                            donation.donator.website,
                                            donation.donator.facebook,
                                            donation.donator.discord,
                                            donation.donator.twitter,
                                            donation.donator.instagram,
                                            donation.donator.imageurl,
                                            donation.donator.role,
                                            donation.donator.type
                                           ),
                    amount = donation.amount
                });
            }

            return recentImpactors;

        }

        public List<DonationDto> SearchDonations(GenericDto<DonationDto>? donationDto)
        {
            var donations = donationRepository.SearchAsync(donationDto).Result;

            var donationDtoList = new List<DonationDto>();
            foreach (var donation in donations)
            {
                donationDtoList.Add(new DonationDto(
                                            donation.id, 
                                            donation.amount,
                                            new ProjectDto(
                                                donation.project.id,
                                                new CharityDto(
                                                    donation.project.charity.id,
                                                    donation.project.charity.name,
                                                    donation.project.charity.wallet,
                                                    donation.project.charity.website,
                                                    donation.project.charity.facebook,
                                                    donation.project.charity.discord,
                                                    donation.project.charity.twitter,
                                                    donation.project.charity.imageurl,
                                                    donation.project.charity.description
                                                ),
                                                donation.project.wallet,
                                                donation.project.name,
                                                donation.project.description,
                                                donation.project.milestones,
                                                donation.project.financialgoal,
                                                donation.project.totaldonated,
                                                donation.project.totalbackers,
                                                donation.project.website,
                                                donation.project.facebook,
                                                donation.project.discord,
                                                donation.project.twitter,
                                                donation.project.instagram,
                                                donation.project.imageurl,
                                                donation.project.impactor == null ? null : new ImpactorDto(
                                                    donation.project.impactor.id,
                                                    donation.project.impactor.wallet,
                                                    donation.project.impactor.name,
                                                    donation.project.impactor.description,
                                                    donation.project.impactor.website,
                                                    donation.project.impactor.facebook,
                                                    donation.project.impactor.discord,
                                                    donation.project.impactor.twitter,
                                                    donation.project.impactor.instagram,
                                                    donation.project.impactor.imageurl,
                                                    donation.project.impactor.role,
                                                    donation.project.impactor.type
                                                ),
                                                new CauseTypeDto(
                                                    donation.project.primarycausetype.id,
                                                    donation.project.primarycausetype.name
                                                ),
                                                new CauseTypeDto(
                                                    donation.project.secondarycausetype.id,
                                                    donation.project.secondarycausetype.name
                                                )
                                            ),
                                            new ImpactorDto(
                                                donation.donator.id,
                                                donation.donator.wallet,
                                                donation.donator.name,
                                                donation.donator.description,
                                                donation.donator.website,
                                                donation.donator.facebook,
                                                donation.donator.discord,
                                                donation.donator.twitter,
                                                donation.donator.instagram,
                                                donation.donator.imageurl,
                                                donation.donator.role,
                                                donation.donator.type
                                            )
                                        ));
            }

            return donationDtoList;


        }
    }
}
