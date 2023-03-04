using ChainImpactAPI.Application.RepositoryInterfaces;
using ChainImpactAPI.Dtos.SearchDtos;
using ChainImpactAPI.Dtos;
using ChainImpactAPI.Models;

namespace ChainImpactAPI.Infrastructure.Repositories
{
    public class NFTTypeRepository : GenericRepository<NFTType>, INFTTypeRepository
    {
        public NFTTypeRepository(ApiDbContext context) : base(context)
        {
        }

        override
        public async Task<List<NFTType>> ListAllAsync()
        {
            return await base.ListAllAsync(nft => nft.causetype);
        }


        public async Task<List<NFTType>> SearchAsync(GenericDto<NFTTypeSearchDto>? nftTypeSearchDto)
        {
            var nfts = await base.ListAllAsync(nft => nft.causetype);

            int? skip = null;
            int? take = null;
            NFTTypeSearchDto nftTypeSearch = new NFTTypeSearchDto();

            if (nftTypeSearchDto != null)
            {
                if (nftTypeSearchDto.PageSize != null && nftTypeSearchDto.PageNumber != null)
                {
                    skip = nftTypeSearchDto.PageSize.Value * (nftTypeSearchDto.PageNumber.Value - 1);
                    take = nftTypeSearchDto.PageSize.Value;
                }
                if(nftTypeSearchDto.Dto != null)
                {
                    nftTypeSearch = nftTypeSearchDto.Dto;
                }
            }

            if (nftTypeSearch.tier != null)
            {
                nfts = nfts.Where(nft => nft.tier == nftTypeSearch.tier).ToList();
            }
            if (nftTypeSearch.usertype != null)
            {
                nfts = nfts.Where(nft => nft.usertype == nftTypeSearch.usertype).ToList();
            }
            if (nftTypeSearch.causetype != null)
            {
                nfts = nfts.Where(nft => nft.causetype.id == nftTypeSearch.causetype.id).ToList();
            }

            nfts = nfts.OrderBy(nft => nft.symbol).ToList();

            if (skip != null && take != null)
            {
                nfts = nfts.Skip(skip.Value).Take(take.Value).ToList();
            }


            return nfts;
        }



    }
}
