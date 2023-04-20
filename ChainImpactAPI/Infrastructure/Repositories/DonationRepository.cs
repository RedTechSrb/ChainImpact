using ChainImpactAPI.Application.RepositoryInterfaces;
using ChainImpactAPI.Dtos;
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


        public async Task<List<Donation>> SearchAsync(GenericDto<DonationDto>? donationSearchDto)
        {
            var donations = await base.ListAllAsync(d => d.project, d => d.donator, d => d.project.primarycausetype, d => d.project.secondarycausetype, d => d.project.charity);

            int? skip = null;
            int? take = null;
            DonationDto donationSearch = new DonationDto();

            if (donationSearchDto != null)
            {
                if (donationSearchDto.PageSize != null && donationSearchDto.PageNumber != null)
                {
                    skip = donationSearchDto.PageSize.Value * (donationSearchDto.PageNumber.Value - 1);
                    take = donationSearchDto.PageSize.Value;
                }
                if (donationSearchDto.Dto != null)
                {
                    donationSearch = donationSearchDto.Dto;
                }
            }

            if (donationSearch.id != null)
            {
                donations = donations.Where(d => d.id == donationSearch.id).ToList();
            }
            if (donationSearch.amount != null)
            {
                donations = donations.Where(d => d.amount == donationSearch.amount).ToList();
            }
            if (donationSearch.donator != null)
            {
                donations = donations.Where(d => d.donator.id == donationSearch.donator.id).ToList();
            }
            if (donationSearch.project != null)
            {
                donations = donations.Where(d => d.project.id == donationSearch.project.id).ToList();
            }

            donations = donations.OrderByDescending(d => d.amount).ToList();

            if (skip != null && take != null)
            {
                donations = donations.Skip(skip.Value).Take(take.Value).ToList();
            }


            return donations;

        }


    }
}
