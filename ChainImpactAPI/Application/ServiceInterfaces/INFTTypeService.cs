using ChainImpactAPI.Dtos;
using ChainImpactAPI.Dtos.NFT;
using ChainImpactAPI.Dtos.SearchDtos;
using ChainImpactAPI.Models;

namespace ChainImpactAPI.Application.ServiceInterfaces
{
    public interface INFTTypeService
    {
        List<NFTResponseDto> GetNFTList();
        List<NFTResponseDto> GetNFTsData(GenericDto<NFTRequestDto>? nftDto);
        List<NFTTypeDto> SearchNFTs(GenericDto<NFTTypeDto> nftTypeDto);
    }
}
