using ChainImpactAPI.Application.RepositoryInterfaces;
using ChainImpactAPI.Dtos.ImpactorsWithDonations;
using ChainImpactAPI.Dtos.SearchDtos;
using ChainImpactAPI.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace ChainImpactAPI.Infrastructure.Repositories
{
    public class DonationRepository : GenericRepository<Donation>, IDonationRepository
    {
        public DonationRepository(ApiDbContext context) : base(context)
        {
        }
        /*
        public async Task<List<Donation>> SearchDonationsAsync(DonationSearchDto donationSearchDto, Expression<Func<BaseEntity, object>>[] relations)
        {
            var donations = context.donation.Include(d => d.donator)
                                            .Include(d => d.project)
                                            .AsQueryable();

            // TODO!!!

            if(donationSearchDto.projectType != null)
            {
                donations = donations.Where(d => d.project.primarycausetype.name == donationSearchDto.projectType);
            }

            return await donations.ToListAsync();
        }
        */

        public async Task<List<ImpactorsWithDonationsResponseDto>> SearchDonationsGroupedByImpactorsAsync(DonationSearchDto donationSearchDto)
        {
            var donations = context.donation.Include(d => d.donator)
                                            .Include(d => d.project)
                                            .AsQueryable();

            if (donationSearchDto.projectType != null)
            {
                if(donationSearchDto.projectType == "environment")
                {
                    donations = donations.Where(d => d.project.primarycausetype.name == "environment" || d.project.primarycausetype.name == "health" || d.project.primarycausetype.name == "disaster relief");
                }
                else if (donationSearchDto.projectType == "social")
                {
                    donations = donations.Where(d => d.project.primarycausetype.name == "social" || d.project.primarycausetype.name == "ekosystem" || d.project.primarycausetype.name == "education");
                }
            }

            List<ImpactorsWithDonationsResponseDto> donationsGroupedByImpactors = await donations.GroupBy(d => new {
                                                                                                    d.donator.id, d.donator.name, d.donator.wallet, d.donator.type, d.donator.imageurl
                                                                                         }).Select(gpb => new ImpactorsWithDonationsResponseDto {
                                                                                            name = gpb.Key.name,
                                                                                            wallet = gpb.Key.wallet,
                                                                                            userType = gpb.Key.type,
                                                                                            imageUrl = gpb.Key.imageurl,
                                                                                            totalDonations = gpb.Sum(d => d.amount)
                                                                                         }).OrderByDescending(iwd => iwd.totalDonations)
                                                                                         .ToListAsync();

            return donationsGroupedByImpactors;
        }

    }
}
