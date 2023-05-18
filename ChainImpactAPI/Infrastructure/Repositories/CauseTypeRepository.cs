using ChainImpactAPI.Application.RepositoryInterfaces;
using ChainImpactAPI.Dtos;
using ChainImpactAPI.Dtos.SearchDtos;
using ChainImpactAPI.Models;

namespace ChainImpactAPI.Infrastructure.Repositories
{
    public class CauseTypeRepository : GenericRepository<CauseType>, ICauseTypeRepository
    {
        public CauseTypeRepository(ApiDbContext context) : base(context)
        {
        }

        public async Task<List<CauseType>> SearchAsync(GenericDto<CauseTypeDto>? causeTypeSearchDto)
        {
            var causeTypes = await base.ListAllAsync();

            int? skip = null;
            int? take = null;
            CauseTypeDto causeTypeSearch = new CauseTypeDto();

            if (causeTypeSearchDto != null)
            {
                if (causeTypeSearchDto.PageSize != null && causeTypeSearchDto.PageNumber != null)
                {
                    skip = causeTypeSearchDto.PageSize.Value * (causeTypeSearchDto.PageNumber.Value - 1);
                    take = causeTypeSearchDto.PageSize.Value;
                }
                if (causeTypeSearchDto.Dto != null)
                {
                    causeTypeSearch = causeTypeSearchDto.Dto;
                }
            }

            if (causeTypeSearch.id != null)
            {
                causeTypes = causeTypes.Where(ct => ct.id == causeTypeSearch.id).ToList();
            }
            if (causeTypeSearch.name != null)
            {
                causeTypes = causeTypes.Where(ct => ct.name == causeTypeSearch.name).ToList();
            }

            if (skip != null && take != null)
            {
                causeTypes = causeTypes.Skip(skip.Value).Take(take.Value).ToList();
            }


            return causeTypes;
        }


    }
}
