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
            CharityDto chairtySearch = new CharityDto();

            if (charityDto != null)
            {
                if (charityDto.PageSize != null && charityDto.PageNumber != null)
                {
                    skip = charityDto.PageSize.Value * (charityDto.PageNumber.Value - 1);
                    take = charityDto.PageSize.Value;
                }
                if (charityDto.Dto != null)
                {
                    chairtySearch = charityDto.Dto;
                }
            }

            if (chairtySearch.id != null)
            {
                charities = charities.Where(i => i.id == chairtySearch.id).ToList();
            }
            if (chairtySearch.name != null)
            {
                charities = charities.Where(i => i.name == chairtySearch.name).ToList();
            }
            if (chairtySearch.wallet != null)
            {
                charities = charities.Where(i => i.wallet == chairtySearch.wallet).ToList();
            }
            if (chairtySearch.website != null)
            {
                charities = charities.Where(i => i.website == chairtySearch.website).ToList();
            }
            if (chairtySearch.facebook != null)
            {
                charities = charities.Where(i => i.facebook == chairtySearch.facebook).ToList();
            }
            if (chairtySearch.discord != null)
            {
                charities = charities.Where(i => i.discord == chairtySearch.discord).ToList();
            }
            if (chairtySearch.twitter != null)
            {
                charities = charities.Where(i => i.twitter == chairtySearch.twitter).ToList();
            }
            if (chairtySearch.imageurl != null)
            {
                charities = charities.Where(i => i.imageurl == chairtySearch.imageurl).ToList();
            }
            if (chairtySearch.description != null)
            {
                charities = charities.Where(i => i.description == chairtySearch.description).ToList();
            }
            if (chairtySearch.instagram != null)
            {
                charities = charities.Where(i => i.instagram == chairtySearch.instagram).ToList();
            }
            if (chairtySearch.confirmed != null)
            {
                charities = charities.Where(i => i.confirmed == chairtySearch.confirmed).ToList();
            }
            if (chairtySearch.email != null)
            {
                charities = charities.Where(i => i.email == chairtySearch.email).ToList();
            }


            if (skip != null && take != null)
            {
                charities = charities.Skip(skip.Value).Take(take.Value).ToList();
            }


            return charities;
        }

    }
}
