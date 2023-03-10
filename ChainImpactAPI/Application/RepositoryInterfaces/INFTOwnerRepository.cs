using ChainImpactAPI.Dtos;
using ChainImpactAPI.Models;

namespace ChainImpactAPI.Application.RepositoryInterfaces
{
    public interface INFTOwnerRepository : IGenericRepository<NFTOwner>
    {
        public Task<List<NFTOwner>> SearchAsync(GenericDto<NFTOwnerDto> nftOwnerSearchDto);
    }
}
