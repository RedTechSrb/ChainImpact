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


        public async Task<List<Charity>> SearchAsync(GenericDto<CharityDto>? charityDto)
        {
            var charities = await base.ListAllAsync();

            int? skip = null;
            int? take = null;
            CharitySearchDto chairtySearch = new CharitySearchDto();

            if (charityDto != null)
            {
                if (charityDto.PageSize != null && charityDto.PageNumber != null)
                {
                    skip = charityDto.PageSize.Value * (charityDto.PageNumber.Value - 1);
                    take = charityDto.PageSize.Value;
                }

            }



            if (skip != null && take != null)
            {
                charities = charities.Skip(skip.Value).Take(take.Value).ToList();
            }


            return charities;
        }

    }
}
