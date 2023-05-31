using ChainImpactAPI.Application.RepositoryInterfaces;
using ChainImpactAPI.Application.ServiceInterfaces;
using ChainImpactAPI.Dtos;
using ChainImpactAPI.Dtos.ImpactorsWithDonations;
using ChainImpactAPI.Dtos.MilestonesWithTransactions;
using ChainImpactAPI.Infrastructure.Repositories;
using ChainImpactAPI.Models;

namespace ChainImpactAPI.Infrastructure.Services
{
    public class MilestoneService : IMilestoneService
    {
        private readonly IConfiguration configuration;
        private readonly IMilestoneRepository milestoneRepository;
        private readonly ITransactionService transactionService;

        public MilestoneService(
            IConfiguration configuration, 
            IMilestoneRepository milestoneRepository,
            ITransactionService transactionService)
        {
            this.configuration = configuration;
            this.milestoneRepository = milestoneRepository;
            this.transactionService = transactionService;
        }
        public List<MilestonesWithTransactionsResponse> SearchMilestones(GenericDto<MilestoneDto>? milestoneDto)
        {
            var milestones = milestoneRepository.SearchAsync(milestoneDto).Result;

            // [order by] Sort by ordernumber
            milestones = milestones.OrderBy(m => m.ordernumber).ToList();

            var milestonesWithTransactions = new List<MilestonesWithTransactionsResponse>();

            foreach (var milestone in milestones)
            {
                var transactionsOfMilestone = transactionService.SearchTransactions(new GenericDto<TransactionDto>(null, null,
                                                                                    new TransactionDto
                                                                                    {
                                                                                        milestone = new MilestoneDto
                                                                                        {
                                                                                            id = milestone.id
                                                                                        }
                                                                                    }));


                milestonesWithTransactions.Add(new MilestonesWithTransactionsResponse
                {
                    milestone = new MilestoneDto
                    {
                        id = milestone.id,
                        complete = milestone.complete,
                        description = milestone.description,
                        name = milestone.name,
                        ordernumber= milestone.ordernumber,
                        project = new ProjectDto(
                                            milestone.project.id,
                                            new CharityDto(
                                                milestone.project.charity.id,
                                                milestone.project.charity.name,
                                                milestone.project.charity.wallet,
                                                milestone.project.charity.website,
                                                milestone.project.charity.facebook,
                                                milestone.project.charity.discord,
                                                milestone.project.charity.twitter,
                                                milestone.project.charity.imageurl,
                                                milestone.project.charity.description,
                                                milestone.project.charity.instagram,
                                                milestone.project.charity.confirmed,
                                                milestone.project.charity.email
                                            ),
                                            milestone.project.wallet,
                                            milestone.project.name,
                                            milestone.project.description,
                                            milestone.project.financialgoal,
                                            milestone.project.totaldonated,
                                            milestone.project.totalbackers,
                                            milestone.project.website,
                                            milestone.project.facebook,
                                            milestone.project.discord,
                                            milestone.project.twitter,
                                            milestone.project.instagram,
                                            milestone.project.imageurl,
                                            milestone.project.impactor == null ? null : new ImpactorDto(
                                                milestone.project.impactor.id,
                                                milestone.project.impactor.wallet,
                                                milestone.project.impactor.name,
                                                milestone.project.impactor.description,
                                                milestone.project.impactor.website,
                                                milestone.project.impactor.facebook,
                                                milestone.project.impactor.discord,
                                                milestone.project.impactor.twitter,
                                                milestone.project.impactor.instagram,
                                                milestone.project.impactor.imageurl,
                                                milestone.project.impactor.role,
                                                milestone.project.impactor.type,
                                                milestone.project.impactor.confirmed,
                                                milestone.project.impactor.password,
                                                milestone.project.impactor.username,
                                                milestone.project.impactor.email
                                            ),
                                            new CauseTypeDto(
                                                milestone.project.primarycausetype.id,
                                                milestone.project.primarycausetype.name
                                            ),
                                            new CauseTypeDto(
                                                milestone.project.secondarycausetype.id,
                                                milestone.project.secondarycausetype.name
                                            ),
                                            milestone.project.confirmed
                                        )
                    },
                    transactions = transactionsOfMilestone
                });
            }

            return milestonesWithTransactions;
        }

    }
}
