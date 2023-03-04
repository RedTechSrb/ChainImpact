using ChainImpactAPI.Application.RepositoryInterfaces;
using ChainImpactAPI.Application.ServiceInterfaces;
using ChainImpactAPI.Dtos;
using ChainImpactAPI.Dtos.NFT;
using ChainImpactAPI.Dtos.SearchDtos;
using ChainImpactAPI.Infrastructure.Repositories;

namespace ChainImpactAPI.Infrastructure.Services
{
    public class NFTTypeService : INFTTypeService
    {
        private readonly IConfiguration configuration;
        private readonly INFTTypeRepository nFTTypeRepository;
        private readonly ICauseTypeService causeTypeService;

        public NFTTypeService(
            IConfiguration configuration,
            INFTTypeRepository nFTTypeRepository,
            ICauseTypeService causeTypeService)
        {
            this.configuration = configuration;
            this.nFTTypeRepository = nFTTypeRepository;
            this.causeTypeService = causeTypeService;
        }

        public List<NFTResponseDto> GetNFTList()
        {

            var nfts = nFTTypeRepository.ListAllAsync().Result;

            var nftDtoList = new List<NFTResponseDto>();
            foreach (var nft in nfts)
            {
                nftDtoList.Add(new NFTResponseDto
                {
                    description = nft.description,
                    external_url = configuration["ChainImpactData:Url"],
                    image = nft.imageurl,
                    name = nft.causetype.name + " #" + nft.tier,
                    symbol = nft.symbol,
                });
            }

            return nftDtoList;

        }

        public List<NFTResponseDto> GetNFTsData(GenericDto<NFTTypeSearchDto>? nftTypeSearchDto)
        {
            if (nftTypeSearchDto != null)
            {
                if (nftTypeSearchDto.Dto != null && nftTypeSearchDto.Dto.causetype != null)
                {
                    nftTypeSearchDto.Dto.causetype = causeTypeService.SearchCauseTypes(new GenericDto<CauseTypeDto>(null, null, nftTypeSearchDto.Dto.causetype)).FirstOrDefault();
                }
            }

            var nfts = nFTTypeRepository.SearchAsync(nftTypeSearchDto).Result;

            var nftDtoList = new List<NFTResponseDto>();
            foreach (var nft in nfts)
            {
                nftDtoList.Add(new NFTResponseDto
                {
                    description = nft.description,
                    external_url = configuration["ChainImpactData:Url"],
                    image = nft.imageurl,
                    name = nft.causetype.name + " #" + nft.tier,
                    symbol = nft.symbol,
                });
            }

            return nftDtoList;
        }



    }
}
