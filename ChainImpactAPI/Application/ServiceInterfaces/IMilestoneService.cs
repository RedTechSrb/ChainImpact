using ChainImpactAPI.Dtos;

namespace ChainImpactAPI.Application.ServiceInterfaces
{
    public interface IMilestoneService
    {
        List<MilestoneDto> SearchMilestones(GenericDto<MilestoneDto>? milestoneDto);

    }
}
