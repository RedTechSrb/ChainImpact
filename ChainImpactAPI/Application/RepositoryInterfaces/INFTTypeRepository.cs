using ChainImpactAPI.Dtos;
using ChainImpactAPI.Dtos.SearchDtos;
using ChainImpactAPI.Models;

namespace ChainImpactAPI.Application.RepositoryInterfaces
{
    public interface INFTTypeRepository : IGenericRepository<NFTType>
    {
        Task<List<NFTType>> SearchAsync(GenericDto<NFTTypeSearchDto>? nftTypeSearchDto);
        Task<List<NFTType>> SearchAsync(GenericDto<NFTTypeDto>? nftTypeSearchDto);
    }
}
