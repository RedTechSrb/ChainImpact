using ChainImpactAPI.Application.RepositoryInterfaces;
using ChainImpactAPI.Dtos;
using ChainImpactAPI.Dtos.SearchDtos;
using ChainImpactAPI.Models;

namespace ChainImpactAPI.Infrastructure.Repositories
{
    public class NFTOwnerRepository : GenericRepository<NFTOwner>, INFTOwnerRepository
    {
        public NFTOwnerRepository(ApiDbContext context) : base(context)
        {
        }

        public async Task<List<NFTOwner>> SearchAsync(GenericDto<NFTOwnerDto> nftOwnerSearchDto)
        {
            var nftowners = await base.ListAllAsync(o => o.nfttype, o => o.nfttype.causetype, o => o.impactor);

            int? skip = null;
            int? take = null;
            NFTOwnerDto nftOwnerSearch = new NFTOwnerDto();

            if (nftOwnerSearchDto != null)
            {
                if (nftOwnerSearchDto.PageSize != null && nftOwnerSearchDto.PageNumber != null)
                {
                    skip = nftOwnerSearchDto.PageSize.Value * (nftOwnerSearchDto.PageNumber.Value - 1);
                    take = nftOwnerSearchDto.PageSize.Value;
                }
                if (nftOwnerSearchDto.Dto != null)
                {
                    nftOwnerSearch = nftOwnerSearchDto.Dto;
                }
            }

            if (nftOwnerSearch.id != null)
            {
                nftowners = nftowners.Where(o => o.id == nftOwnerSearch.id).ToList();
            }
            if (nftOwnerSearch.impactor != null)
            {
                nftowners = nftowners.Where(o => o.impactor.id == nftOwnerSearch.impactor.id).ToList();
            }
            if (nftOwnerSearch.nfttype != null)
            {
                nftowners = nftowners.Where(o => o.nfttype.id == nftOwnerSearch.nfttype.id).ToList();
            }

            if (skip != null && take != null)
            {
                nftowners = nftowners.Skip(skip.Value).Take(take.Value).ToList();
            }

            return nftowners;

        }

    }
}
