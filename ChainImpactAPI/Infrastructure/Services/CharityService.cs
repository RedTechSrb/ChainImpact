using ChainImpactAPI.Application.RepositoryInterfaces;
using ChainImpactAPI.Application.ServiceInterfaces;
using ChainImpactAPI.Dtos;
using ChainImpactAPI.Dtos.SearchDtos;
using ChainImpactAPI.Infrastructure.Repositories;
using ChainImpactAPI.Models;

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

        public List<CharityDto> SearchCharities(GenericDto<CharityDto>? charityDto)
        {
            var charities = charityRepository.SearchAsync(charityDto).Result;

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

        public Charity SaveCharity(CharityDto charityDto)
        {
            var charity = charityRepository.SearchAsync(new GenericDto<CharityDto>(new CharityDto{ name = charityDto.name })).Result.FirstOrDefault();
            
            if(charity == null)
            {
                charity = new Charity 
                { 
                    description= charityDto.description,
                    discord= charityDto.discord,
                    imageurl= charityDto.imageurl,
                    twitter= charityDto.twitter,
                    facebook= charityDto.facebook,
                    website= charityDto.twitter,
                    wallet = charityDto.wallet,
                    name = charityDto.name
                };
            }
            else
            {
                // Update charity, only following fields can be updated
                // charity.name = charityDto.name == null ? charity.name : charityDto.name;
                charity.wallet = charityDto.wallet == null ? charity.wallet : charityDto.wallet;
                charity.website = charityDto.website == null ? charity.website : charityDto.website;
                charity.facebook = charityDto.facebook == null ? charity.facebook : charityDto.facebook;
                charity.discord = charityDto.discord == null ? charity.discord : charityDto.discord;
                charity.twitter = charityDto.twitter == null ? charity.twitter : charityDto.twitter;
                charity.imageurl = charityDto.imageurl == null ? charity.imageurl : charityDto.imageurl;
                charity.description = charityDto.description == null ? charity.description : charityDto.description;
            }

            return charityRepository.Save(charity);
        }

    }
}
