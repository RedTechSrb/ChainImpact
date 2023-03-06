using ChainImpactAPI.Application.RepositoryInterfaces;
using ChainImpactAPI.Application.ServiceInterfaces;
using ChainImpactAPI.Dtos;
using ChainImpactAPI.Dtos.SearchDtos;

namespace ChainImpactAPI.Infrastructure.Services
{
    public class CharityService : ICharityService
    {
        private readonly IConfiguration configuration;
        private readonly ICharityRepository charityRepository;

        public CharityService(
            IConfiguration configuration,
            ICharityRepository charityRepository)
        {
            this.configuration = configuration;
            this.charityRepository = charityRepository;
        }

        public List<CharityDto> SearchCharities(GenericDto<CharitySearchDto>? charitySearchDto)
        {
            var charities = charityRepository.SearchAsync(charitySearchDto).Result;

            var charityDtoList = new List<CharityDto>();
            foreach (var charity in charities)
            {
                charityDtoList.Add(new CharityDto(
                        charity.id,
                        charity.name,
                        charity.wallet, 
                        charity.website,
                        charity.facebook,
                        charity.discord,
                        charity.twitter,
                        charity.imageurl,
                        charity.description
                    ));
            }

            return charityDtoList;


        }
    }
}
