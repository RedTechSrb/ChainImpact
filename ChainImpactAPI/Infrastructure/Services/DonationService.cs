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
        private readonly ICharityRepository charityRepository;

        public DonationService(
            IConfiguration configuration,
            IDonationRepository donationRepository,
            IImpactorRepository impactorRepository,
            ITransactionRepository transactionRepository,
            IProjectRepository projectRepository,
            ICharityRepository charityRepository)
        {
            this.configuration = configuration;
            this.donationRepository = donationRepository;
            this.impactorRepository = impactorRepository;
            this.transactionRepository = transactionRepository;
            this.projectRepository = projectRepository;
            this.charityRepository = charityRepository;
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

            donations = donations.OrderByDescending(d => d.creationdate).ToList();

            if (skip != null && take != null)
            {
                donations = donations.Skip(skip.Value).Take(take.Value).ToList();
            }


            var recentImpactors= new List<RecentDonationsResponseDto>();
            foreach (var donation in donations)
            {
                var tranactions = transactionRepository.SearchAsync(new GenericDto<TransactionDto>(null, null, new TransactionDto { donation = new DonationDto { id = donation.id } })).Result;
                List<TransactionDto> transactionsDto = new List<TransactionDto>();
                foreach (var transaction in tranactions)
                {
                    transactionsDto.Add(new TransactionDto(
                                            transaction.id,
                                            transaction.blockchainaddress,
                                            transaction.sender,
                                            transaction.receiver,
                                            transaction.amount,
                                            transaction.type,
                                            transaction.creationdate,
                                            transaction.donation == null ? null : new DonationDto(
                                                transaction.donation.id,
                                                transaction.donation.amount,
                                                transaction.donation.creationdate,
                                                new ProjectDto(
                                                    transaction.donation.project.id,
                                                    new CharityDto(
                                                        transaction.donation.project.charity.id,
                                                        transaction.donation.project.charity.name,
                                                        transaction.donation.project.charity.wallet,
                                                        transaction.donation.project.charity.website,
                                                        transaction.donation.project.charity.facebook,
                                                        transaction.donation.project.charity.discord,
                                                        transaction.donation.project.charity.twitter,
                                                        transaction.donation.project.charity.imageurl,
                                                        transaction.donation.project.charity.description,
                                                        transaction.donation.project.charity.instagram,
                                                        transaction.donation.project.charity.confirmed,
                                                        transaction.donation.project.charity.email
                                                    ),
                                                    transaction.donation.project.wallet,
                                                    transaction.donation.project.name,
                                                    transaction.donation.project.description,
                                                    transaction.donation.project.financialgoal,
                                                    transaction.donation.project.totaldonated,
                                                    transaction.donation.project.totalbackers,
                                                    transaction.donation.project.website,
                                                    transaction.donation.project.facebook,
                                                    transaction.donation.project.discord,
                                                    transaction.donation.project.twitter,
                                                    transaction.donation.project.instagram,
                                                    transaction.donation.project.imageurl,
                                                    transaction.donation.project.impactor == null ? null : new ImpactorDto(
                                                        transaction.donation.project.impactor.id,
                                                        transaction.donation.project.impactor.wallet,
                                                        transaction.donation.project.impactor.name,
                                                        transaction.donation.project.impactor.description,
                                                        transaction.donation.project.impactor.website,
                                                        transaction.donation.project.impactor.facebook,
                                                        transaction.donation.project.impactor.discord,
                                                        transaction.donation.project.impactor.twitter,
                                                        transaction.donation.project.impactor.instagram,
                                                        transaction.donation.project.impactor.imageurl,
                                                        transaction.donation.project.impactor.role,
                                                        transaction.donation.project.impactor.type,
                                                        transaction.donation.project.impactor.confirmed
                                                    ),
                                                    new CauseTypeDto(
                                                        transaction.donation.project.primarycausetype.id,
                                                        transaction.donation.project.primarycausetype.name
                                                    ),
                                                    new CauseTypeDto(
                                                        transaction.donation.project.secondarycausetype.id,
                                                        transaction.donation.project.secondarycausetype.name
                                                    ),
                                                    transaction.donation.project.confirmed
                                                ),
                                                new ImpactorDto(
                                                    transaction.donation.donator.id,
                                                    transaction.donation.donator.wallet,
                                                    transaction.donation.donator.name,
                                                    transaction.donation.donator.description,
                                                    transaction.donation.donator.website,
                                                    transaction.donation.donator.facebook,
                                                    transaction.donation.donator.discord,
                                                    transaction.donation.donator.twitter,
                                                    transaction.donation.donator.instagram,
                                                    transaction.donation.donator.imageurl,
                                                    transaction.donation.donator.role,
                                                    transaction.donation.donator.type,
                                                    transaction.donation.donator.confirmed
                                                )
                                            ),
                                            transaction.milestone == null ? null : new MilestoneDto(
                                                transaction.milestone.id,
                                                transaction.milestone.name,
                                                transaction.milestone.ordernumber,
                                                transaction.milestone.description,
                                                transaction.milestone.complete,
                                                new ProjectDto(
                                                    transaction.milestone.project.id,
                                                    new CharityDto(
                                                        transaction.milestone.project.charity.id,
                                                        transaction.milestone.project.charity.name,
                                                        transaction.milestone.project.charity.wallet,
                                                        transaction.milestone.project.charity.website,
                                                        transaction.milestone.project.charity.facebook,
                                                        transaction.milestone.project.charity.discord,
                                                        transaction.milestone.project.charity.twitter,
                                                        transaction.milestone.project.charity.imageurl,
                                                        transaction.milestone.project.charity.description,
                                                        transaction.milestone.project.charity.instagram,
                                                        transaction.milestone.project.charity.confirmed,
                                                        transaction.milestone.project.charity.email
                                                    ),
                                                    transaction.milestone.project.wallet,
                                                    transaction.milestone.project.name,
                                                    transaction.milestone.project.description,
                                                    transaction.milestone.project.financialgoal,
                                                    transaction.milestone.project.totaldonated,
                                                    transaction.milestone.project.totalbackers,
                                                    transaction.milestone.project.website,
                                                    transaction.milestone.project.facebook,
                                                    transaction.milestone.project.discord,
                                                    transaction.milestone.project.twitter,
                                                    transaction.milestone.project.instagram,
                                                    transaction.milestone.project.imageurl,
                                                    transaction.milestone.project.impactor == null ? null : new ImpactorDto(
                                                        transaction.milestone.project.impactor.id,
                                                        transaction.milestone.project.impactor.wallet,
                                                        transaction.milestone.project.impactor.name,
                                                        transaction.milestone.project.impactor.description,
                                                        transaction.milestone.project.impactor.website,
                                                        transaction.milestone.project.impactor.facebook,
                                                        transaction.milestone.project.impactor.discord,
                                                        transaction.milestone.project.impactor.twitter,
                                                        transaction.milestone.project.impactor.instagram,
                                                        transaction.milestone.project.impactor.imageurl,
                                                        transaction.milestone.project.impactor.role,
                                                        transaction.milestone.project.impactor.type,
                                                        transaction.milestone.project.impactor.confirmed
                                                    ),
                                                    new CauseTypeDto(
                                                        transaction.milestone.project.primarycausetype.id,
                                                        transaction.milestone.project.primarycausetype.name
                                                    ),
                                                    new CauseTypeDto(
                                                        transaction.milestone.project.secondarycausetype.id,
                                                        transaction.milestone.project.secondarycausetype.name
                                                    ),
                                                    transaction.milestone.project.confirmed
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
                                            donation.donator.type,
                                            donation.donator.confirmed
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
                                            donation.creationdate,
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
                                                    donation.project.charity.description,
                                                    donation.project.charity.instagram,
                                                    donation.project.charity.confirmed,
                                                    donation.project.charity.email
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
                                                    donation.project.impactor.type,
                                                    donation.project.impactor.confirmed
                                                ),
                                                new CauseTypeDto(
                                                    donation.project.primarycausetype.id,
                                                    donation.project.primarycausetype.name
                                                ),
                                                new CauseTypeDto(
                                                    donation.project.secondarycausetype.id,
                                                    donation.project.secondarycausetype.name
                                                ),
                                                donation.project.confirmed
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
                                                donation.donator.type,
                                                donation.donator.confirmed
                                            )
                                        ));
            }

            return donationDtoList;


        }

        public Donation SaveDonaton(SaveDonationRequestDto saveDonationRequestDto)
        {
            var impactor = impactorRepository.SearchAsync(new GenericDto<ImpactorDto>(new ImpactorDto { wallet = saveDonationRequestDto.wallet })).Result.FirstOrDefault();
            var project = projectRepository.SearchAsync(new GenericDto<ProjectSearchDto>(new ProjectSearchDto { id = saveDonationRequestDto.projectid })).Result.FirstOrDefault();

            // Gather project's informations about backers and donations
            project.totaldonated += saveDonationRequestDto.amount;

            var thisProjectDonations = donationRepository.SearchDonationsGroupedByImpactorsAsync(new DonationSearchDto { projectid = project.id }).Result;
            if (thisProjectDonations.FindAll(d => d.wallet == saveDonationRequestDto.wallet).Count == 0)
            {
                project.totalbackers += 1;
            }

            // Donate (save donation

            var donation = new Donation
            {
                amount = saveDonationRequestDto.amount,
                projectid = project.id,
                donatorid = impactor.id,
                creationdate = saveDonationRequestDto.creationdate
            };

            var savedDonation = donationRepository.Save(donation);
            savedDonation.donator = impactor;
            savedDonation.project = project;

            // Upadte information about project
            project = projectRepository.Update(project);

            // Add trasactions 

            if (project.wallet != null)
            {
                // Project has wallet, so there will be two transactions
                // One from donator to charity (project's wallet)

                var transactionDonatorCharity = new Transaction
                {
                    amount = saveDonationRequestDto.amount * 0.98,
                    blockchainaddress = saveDonationRequestDto.blockchainaddress,
                    donationid = savedDonation.id,
                    receiver = project.charity.name,
                    type = 0,
                    creationdate = saveDonationRequestDto.creationdate
                };
                var savedTransactionDonatorCharity = transactionRepository.Save(transactionDonatorCharity);


                // Second from donator to ChainImpact

                var transactionDonatorChainImpact = new Transaction
                {
                    amount = saveDonationRequestDto.amount * 0.02,
                    blockchainaddress = saveDonationRequestDto.blockchainaddress,
                    donationid = savedDonation.id,
                    sender = impactor.name,
                    receiver = "Chain Impact",
                    type = 0
                };
                var savedTransactionDonatorChainImpact = transactionRepository.Save(transactionDonatorChainImpact);


            }
            else
            {
                // Project has no wallet, so there will be three transactions
                // TBD
            }

            // Update NFTs





            return savedDonation;

        }



    }
}
