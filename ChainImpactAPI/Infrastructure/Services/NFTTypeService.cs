using ChainImpactAPI.Application.RepositoryInterfaces;
using ChainImpactAPI.Application.ServiceInterfaces;
using ChainImpactAPI.Dtos;
using ChainImpactAPI.Dtos.NFT;
using ChainImpactAPI.Dtos.SearchDtos;
using ChainImpactAPI.Infrastructure.Repositories;
using ChainImpactAPI.Models;

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

        public List<NFTResponseDto> GetNFTsData(GenericDto<NFTRequestDto>? nftRequestDto)
        {

            NFTTypeSearchDto nftDto = new NFTTypeSearchDto();
            if (nftRequestDto != null && nftRequestDto.Dto != null)
            {
                if (nftRequestDto.Dto.causetype != null)
                {
                    nftDto.causetype = causeTypeService.SearchCauseTypes(new GenericDto<CauseTypeDto>(null, null, new CauseTypeDto(null, nftRequestDto.Dto.causetype))).FirstOrDefault();
                }
                nftDto.tier = nftRequestDto.Dto.tier;
                nftDto.usertype = nftRequestDto.Dto.usertype;
            }

            var nfts = nFTTypeRepository.SearchAsync(new GenericDto<NFTTypeSearchDto>(nftRequestDto?.PageNumber, nftRequestDto?.PageSize, nftDto)).Result;

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

        public List<NFTTypeDto> SearchNFTs(GenericDto<NFTTypeDto> nftTypeDto)
        {
            var nfts = nFTTypeRepository.SearchAsync(nftTypeDto).Result;

            var nftsDtoList = new List<NFTTypeDto>();
            foreach (var nft in nfts)
            {
                nftsDtoList.Add(new NFTTypeDto(
                                    nft.id, 
                                    nft.tier, 
                                    nft.usertype, 
                                    new CauseTypeDto
                                    {
                                        id = nft.causetype.id,
                                        name = nft.causetype.name,
                                    },
                                    nft.imageurl, 
                                    nft.minimaldonation, 
                                    nft.symbol, 
                                    nft.description
                             ));
            }

            return nftsDtoList;
        }
    }
}
