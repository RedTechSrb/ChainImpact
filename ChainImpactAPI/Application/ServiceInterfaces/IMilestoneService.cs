using ChainImpactAPI.Dtos;
using ChainImpactAPI.Dtos.MilestonesWithTransactions;

namespace ChainImpactAPI.Application.ServiceInterfaces
{
    public interface IMilestoneService
    {
        List<MilestonesWithTransactionsResponse> SearchMilestones(GenericDto<MilestoneDto>? milestoneDto);

    }
}
