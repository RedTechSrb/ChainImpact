using ChainImpactAPI.Application.ServiceInterfaces;
using ChainImpactAPI.Dtos;
using ChainImpactAPI.Dtos.ImpactorsWithDonations;
using ChainImpactAPI.Dtos.RecentDonations;
using Microsoft.AspNetCore.Mvc;

namespace ChainImpactAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DonationController : ControllerBase
    {
        private readonly IDonationService donationService;

        public DonationController(IDonationService donationService)
        {
            this.donationService = donationService;
        }

        [HttpPost("ImpactorsWithDonations")]
        public IActionResult getImpctorsWithDonations(GenericDto<ImpactorsWithDonationsRequestDto>? impactorsWithDonationsDto)
        {

            var impactorsdonationsDtoList = donationService.GetImpactorsWithDonations(impactorsWithDonationsDto);

            return Ok(impactorsdonationsDtoList);
        }

        [HttpPost("RecentDonations")]
        public IActionResult getRecentDonations(GenericDto<RecentDonationsRequestDto>? recentDonationsDto)
        {

            var recentDonations = donationService.GetRecentDonations(recentDonationsDto);

            return Ok(recentDonations);
        }
/*
        [HttpPost("BiggestDonations")]
        public IActionResult getImpctorsWithDonations(GenericDto<ImpactorsWithDonationsRequestDto>? impactorsWithDonationsDto)
        {

            var impactorsdonationsDtoList = donationService.GetImpactorsWithDonations(impactorsWithDonationsDto);

            return Ok(impactorsdonationsDtoList);
        }
*/


    }
}
