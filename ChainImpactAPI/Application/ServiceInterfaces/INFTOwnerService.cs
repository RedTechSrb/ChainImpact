using ChainImpactAPI.Dtos.NFTLeft;

namespace ChainImpactAPI.Application.ServiceInterfaces
{
    public interface INFTOwnerService
    {
        List<NFTLeftResponseDto> NFTLeft(NFTLeftRequestDto nftLeftRequestDto);
    }
}
