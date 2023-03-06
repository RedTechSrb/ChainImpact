using ChainImpactAPI.Application.RepositoryInterfaces;
using ChainImpactAPI.Dtos;
using ChainImpactAPI.Dtos.SearchDtos;
using ChainImpactAPI.Models;

namespace ChainImpactAPI.Infrastructure.Repositories
{
    public class ImpactorRepository : GenericRepository<Impactor>, IImpactorRepository
    {
        public ImpactorRepository(ApiDbContext context) : base(context)
        {
        }

        public async Task<List<Impactor>> SearchAsync(GenericDto<ImpactorDto>? impactorSearchDto)
        {
            var impactors = await base.ListAllAsync();

            int? skip = null;
            int? take = null;
            ImpactorDto impactorSearch = new ImpactorDto();

            if (impactorSearchDto != null)
            {
                if (impactorSearchDto.PageSize != null && impactorSearchDto.PageNumber != null)
                {
                    skip = impactorSearchDto.PageSize.Value * (impactorSearchDto.PageNumber.Value - 1);
                    take = impactorSearchDto.PageSize.Value;
                }
                if (impactorSearchDto.Dto != null) { 
                    impactorSearch = impactorSearchDto.Dto;
                }
            }

            if (impactorSearch.id != null)
            {
                impactors = impactors.Where(i => i.id == impactorSearch.id).ToList();
            }
            if (impactorSearch.wallet != null)
            {
                impactors = impactors.Where(i => i.wallet == impactorSearch.wallet).ToList();
            }
            if (impactorSearch.name != null)
            {
                impactors = impactors.Where(i => i.name == impactorSearch.name).ToList();
            }
            if (impactorSearch.description != null)
            {
                impactors = impactors.Where(i => i.description == impactorSearch.description).ToList();
            }
            if (impactorSearch.website != null)
            {
                impactors = impactors.Where(i => i.website == impactorSearch.website).ToList();
            }
            if (impactorSearch.facebook != null)
            {
                impactors = impactors.Where(i => i.facebook == impactorSearch.facebook).ToList();
            }
            if (impactorSearch.discord != null)
            {
                impactors = impactors.Where(i => i.discord == impactorSearch.discord).ToList();
            }
            if (impactorSearch.twitter != null)
            {
                impactors = impactors.Where(i => i.twitter == impactorSearch.twitter).ToList();
            }
            if (impactorSearch.instagram != null)
            {
                impactors = impactors.Where(i => i.instagram == impactorSearch.instagram).ToList();
            }
            if (impactorSearch.imageurl != null)
            {
                impactors = impactors.Where(i => i.imageurl == impactorSearch.imageurl).ToList();
            }
            if (impactorSearch.role != null)
            {
                impactors = impactors.Where(i => i.role == impactorSearch.role).ToList();
            }
            if (impactorSearch.type != null)
            {
                impactors = impactors.Where(i => i.type == impactorSearch.type).ToList();
            }

            impactors = impactors.OrderBy(i => i.name).ToList();

            if (skip != null && take != null)
            {
                impactors = impactors.Skip(skip.Value).Take(take.Value).ToList();
            }

            return impactors;
        }



    }
}
