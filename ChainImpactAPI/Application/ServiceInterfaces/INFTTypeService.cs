using ChainImpactAPI.Dtos.NFT;
using ChainImpactAPI.Models;

namespace ChainImpactAPI.Application.ServiceInterfaces
{
    public interface INFTTypeService
    {
        List<NFTResponseDto> GetNFTList();
    }
}
