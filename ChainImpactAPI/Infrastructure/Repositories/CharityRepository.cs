using ChainImpactAPI.Application.RepositoryInterfaces;
using ChainImpactAPI.Dtos.SearchDtos;
using ChainImpactAPI.Dtos;
using ChainImpactAPI.Models;

namespace ChainImpactAPI.Infrastructure.Repositories
{
    public class CharityRepository : GenericRepository<Charity>, ICharityRepository
    {
        public CharityRepository(ApiDbContext context) : base(context)
        {
        }


        public async Task<List<Charity>> SearchAsync(GenericDto<CharitySearchDto>? charitySearchDto)
        {
            var charities = await base.ListAllAsync();

            int? skip = null;
            int? take = null;
            CharitySearchDto chairtySearch = new CharitySearchDto();

            if (charitySearchDto != null)
            {
                if (charitySearchDto.PageSize != null && charitySearchDto.PageNumber != null)
                {
                    skip = charitySearchDto.PageSize.Value * (charitySearchDto.PageNumber.Value - 1);
                    take = charitySearchDto.PageSize.Value;
                }

            }

            charities = charities.OrderBy(p => p.name).ToList();

            if (skip != null && take != null)
            {
                charities = charities.Skip(skip.Value).Take(take.Value).ToList();
            }


            return charities;
        }

    }
}
