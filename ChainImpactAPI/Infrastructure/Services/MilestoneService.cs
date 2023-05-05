using ChainImpactAPI.Application.RepositoryInterfaces;
using ChainImpactAPI.Application.ServiceInterfaces;
using ChainImpactAPI.Dtos;
using ChainImpactAPI.Dtos.ImpactorsWithDonations;
using ChainImpactAPI.Infrastructure.Repositories;

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
        public List<MilestoneDto> SearchMilestones(GenericDto<MilestoneDto>? milestoneDto)
        {
            var milestone = milestoneRepository.SearchAsync(milestoneDto).Result.FirstOrDefault();

            //            var transactionsOfMilestone = transactionService.Search
            return null;
        }

    }
}
