using ChainImpactAPI.Application.RepositoryInterfaces;
using ChainImpactAPI.Application.ServiceInterfaces;
using ChainImpactAPI.Dtos;
using ChainImpactAPI.Dtos.BiggestDonations;
using ChainImpactAPI.Dtos.ImpactorsWithDonations;
using ChainImpactAPI.Dtos.ImpactorsWithProjects;
using ChainImpactAPI.Dtos.NFT;
using ChainImpactAPI.Dtos.RecentDonations;
using ChainImpactAPI.Dtos.SaveDonation;
using ChainImpactAPI.Dtos.SearchDtos;
using ChainImpactAPI.Infrastructure.Repositories;
using ChainImpactAPI.Models;

namespace ChainImpactAPI.Infrastructure.Services
{
    public class DonationService : IDonationService
    {
        private readonly IConfiguration configuration;
        private readonly IDonationRepository donationRepository;
        private readonly IImpactorRepository impactorRepository;
        private readonly ITransactionRepository transactionRepository;
        private readonly IProjectRepository projectRepository;

        public DonationService(
            IConfiguration configuration,
            IDonationRepository donationRepository,
            IImpactorRepository impactorRepository,
            ITransactionRepository transactionRepository,
            IProjectRepository projectRepository)
        {
            this.configuration = configuration;
            this.donationRepository = donationRepository;
            this.impactorRepository = impactorRepository;
            this.transactionRepository = transactionRepository;
            this.projectRepository = projectRepository;
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


        public List<BiggestDonationsResponseDto> GetBiggestDonations(GenericDto<BiggestDonationsRequestDto>? recentDonationsDto)
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



            var mostContributedImapctors = donations.GroupBy(d => new
            {
                d.donator.id,
            }).Select(gpb => new BiggestDonationsResponseDto
            (
                new ImpactorDto(gpb.Key.id),
                gpb.Sum(d => d.amount)
            )).OrderByDescending(bd => bd.amount).ToList();


            if (skip != null && take != null)
            {
                mostContributedImapctors = mostContributedImapctors.Skip(skip.Value).Take(take.Value).ToList();
            }

            mostContributedImapctors.ForEach(d =>
            {
                var impactor = impactorRepository.SearchAsync(new GenericDto<ImpactorDto>(null, null, d.impactor)).Result.FirstOrDefault();
                d.impactor = new ImpactorDto(impactor.id, impactor.wallet, impactor.name, impactor.description, impactor.website, impactor.facebook, impactor.discord, impactor.twitter, impactor.instagram, impactor.imageurl, impactor.role, impactor.type);
            });

            return mostContributedImapctors;

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
                var tranactions = transactionRepository.SearchAsync(new GenericDto<TransactionDto>(null, null, new TransactionDto { donator = new ImpactorDto { id = donation.donator.id }, project = new ProjectDto { id = donation.project.id } })).Result;
                List<TransactionDto> transactionsDto = new List<TransactionDto>();
                foreach (var tranaction in tranactions)
                {
                    transactionsDto.Add(new TransactionDto(
                                            tranaction.id,
                                            tranaction.blockchainaddress,
                                            tranaction.sender,
                                            tranaction.receiver,
                                            tranaction.amount,
                                            new ProjectDto(
                                                tranaction.project.id,
                                                new CharityDto(
                                                    tranaction.project.charity.id,
                                                    tranaction.project.charity.name,
                                                    tranaction.project.charity.wallet,
                                                    tranaction.project.charity.website,
                                                    tranaction.project.charity.facebook,
                                                    tranaction.project.charity.discord,
                                                    tranaction.project.charity.twitter,
                                                    tranaction.project.charity.imageurl,
                                                    tranaction.project.charity.description
                                                ),
                                                tranaction.project.wallet,
                                                tranaction.project.name,
                                                tranaction.project.description,
                                                tranaction.project.financialgoal,
                                                tranaction.project.totaldonated,
                                                tranaction.project.totalbackers,
                                                tranaction.project.website,
                                                tranaction.project.facebook,
                                                tranaction.project.discord,
                                                tranaction.project.twitter,
                                                tranaction.project.instagram,
                                                tranaction.project.imageurl,
                                                tranaction.project.impactor == null ? null : new ImpactorDto(
                                                    tranaction.project.impactor.id,
                                                    tranaction.project.impactor.wallet,
                                                    tranaction.project.impactor.name,
                                                    tranaction.project.impactor.description,
                                                    tranaction.project.impactor.website,
                                                    tranaction.project.impactor.facebook,
                                                    tranaction.project.impactor.discord,
                                                    tranaction.project.impactor.twitter,
                                                    tranaction.project.impactor.instagram,
                                                    tranaction.project.impactor.imageurl,
                                                    tranaction.project.impactor.role,
                                                    tranaction.project.impactor.type
                                                ),
                                                new CauseTypeDto(
                                                    tranaction.project.primarycausetype.id,
                                                    tranaction.project.primarycausetype.name
                                                ),
                                                new CauseTypeDto(
                                                    tranaction.project.secondarycausetype.id,
                                                    tranaction.project.secondarycausetype.name
                                                )
                                            ),
                                            new ImpactorDto(
                                                tranaction.donator.id,
                                                tranaction.donator.wallet,
                                                tranaction.donator.name,
                                                tranaction.donator.description,
                                                tranaction.donator.website,
                                                tranaction.donator.facebook,
                                                tranaction.donator.discord,
                                                tranaction.donator.twitter,
                                                tranaction.donator.instagram,
                                                tranaction.donator.imageurl,
                                                tranaction.donator.role,
                                                tranaction.donator.type
                                            ),
                                            tranaction.milestone == null ? null : new MilestoneDto(
                                                tranaction.milestone.id,
                                                tranaction.milestone.name,
                                                tranaction.milestone.ordernumber,
                                                tranaction.milestone.description,
                                                tranaction.milestone.complete,
                                                new ProjectDto(
                                                    tranaction.milestone.project.id,
                                                    new CharityDto(
                                                        tranaction.milestone.project.charity.id,
                                                        tranaction.milestone.project.charity.name,
                                                        tranaction.milestone.project.charity.wallet,
                                                        tranaction.milestone.project.charity.website,
                                                        tranaction.milestone.project.charity.facebook,
                                                        tranaction.milestone.project.charity.discord,
                                                        tranaction.milestone.project.charity.twitter,
                                                        tranaction.milestone.project.charity.imageurl,
                                                        tranaction.milestone.project.charity.description
                                                    ),
                                                    tranaction.milestone.project.wallet,
                                                    tranaction.milestone.project.name,
                                                    tranaction.milestone.project.description,
                                                    tranaction.milestone.project.financialgoal,
                                                    tranaction.milestone.project.totaldonated,
                                                    tranaction.milestone.project.totalbackers,
                                                    tranaction.milestone.project.website,
                                                    tranaction.milestone.project.facebook,
                                                    tranaction.milestone.project.discord,
                                                    tranaction.milestone.project.twitter,
                                                    tranaction.milestone.project.instagram,
                                                    tranaction.milestone.project.imageurl,
                                                    tranaction.milestone.project.impactor == null ? null : new ImpactorDto(
                                                        tranaction.milestone.project.impactor.id,
                                                        tranaction.milestone.project.impactor.wallet,
                                                        tranaction.milestone.project.impactor.name,
                                                        tranaction.milestone.project.impactor.description,
                                                        tranaction.milestone.project.impactor.website,
                                                        tranaction.milestone.project.impactor.facebook,
                                                        tranaction.milestone.project.impactor.discord,
                                                        tranaction.milestone.project.impactor.twitter,
                                                        tranaction.milestone.project.impactor.instagram,
                                                        tranaction.milestone.project.impactor.imageurl,
                                                        tranaction.milestone.project.impactor.role,
                                                        tranaction.milestone.project.impactor.type
                                                    ),
                                                    new CauseTypeDto(
                                                        tranaction.milestone.project.primarycausetype.id,
                                                        tranaction.milestone.project.primarycausetype.name
                                                    ),
                                                    new CauseTypeDto(
                                                        tranaction.milestone.project.secondarycausetype.id,
                                                        tranaction.milestone.project.secondarycausetype.name
                                                    )
                                                )
                                            )
                                    ));
                }


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
                    amount = donation.amount,
                    transactions = transactionsDto
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

        public Donation SaveDonaton(SaveDonationRequestDto saveDonationRequestDto)
        {
            var impactor = impactorRepository.SearchAsync(new GenericDto<ImpactorDto>(new ImpactorDto { wallet = saveDonationRequestDto.wallet })).Result.FirstOrDefault();
            var project = projectRepository.SearchAsync(new GenericDto<ProjectSearchDto>(new ProjectSearchDto { id = saveDonationRequestDto.projectid })).Result.FirstOrDefault();

            var donation = new Donation
            {
                amount = saveDonationRequestDto.amount,
                projectid = project.id,
                donatorid = impactor.id
            };

            var savedDonation = donationRepository.Save(donation);
            savedDonation.donator = impactor;
            savedDonation.project = project;

            // Update NFTs

            if(project.wallet != null)
            {
                // Project has wallet, so there will be two transactions
                // One from donator to charity (project's wallet)
                


                // Second from donator to ChainImpact



            } else
            {
                // Project has no wallet, so there will be three transactions
                // TBD
            }

            return savedDonation;

        }



    }
}
