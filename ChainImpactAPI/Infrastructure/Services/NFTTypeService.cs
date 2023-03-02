using ChainImpactAPI.Application.RepositoryInterfaces;
using ChainImpactAPI.Application.ServiceInterfaces;
using ChainImpactAPI.Dtos;
using ChainImpactAPI.Dtos.NFT;
using ChainImpactAPI.Infrastructure.Repositories;

namespace ChainImpactAPI.Infrastructure.Services
{
    public class NFTTypeService : INFTTypeService
    {
        private readonly IConfiguration configuration;
        private readonly INFTTypeRepository nFTTypeRepository;

        public NFTTypeService(
            IConfiguration configuration,
            INFTTypeRepository nFTTypeRepository)
        {
            this.configuration = configuration;
            this.nFTTypeRepository = nFTTypeRepository;
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
                    external_url = "https://chainimpact.surge.sh/",
                    image = nft.imageurl,
                    name = nft.causetype.name + " #" + nft.tier,
                    symbol = nft.symbol,
                });
            }

            return nftDtoList;

        }
    }
}
