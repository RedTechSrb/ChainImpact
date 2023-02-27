using ChainImpactAPI.Application.RepositoryInterfaces;
using ChainImpactAPI.Application.ServiceInterfaces;
using ChainImpactAPI.Dtos;
using ChainImpactAPI.Infrastructure.Repositories;

namespace ChainImpactAPI.Infrastructure.Services
{
    public class ImpactorService : IImpactorService
    {
        private readonly IConfiguration configuration;
        private readonly IImpactorRepository impactorRepository;

        public ImpactorService(
            IConfiguration configuration,
            IImpactorRepository impactorRepository)
        {
            this.configuration = configuration;
            this.impactorRepository = impactorRepository;
        }

        public List<ImpactorDto> GetImpactors()
        {
            var impactors = impactorRepository.ListAllAsync().Result;

            var impactorDtoList = new List<ImpactorDto>();
            foreach (var impactor in impactors)
            {
                impactorDtoList.Add(new ImpactorDto(
                            impactor.wallet,
                            impactor.name,
                            impactor.description,
                            impactor.website,
                            impactor.facebook,
                            impactor.discord,
                            impactor.twitter,
                            impactor.instagram,
                            impactor.imageurl,
                            impactor.role,
                            impactor.type
                        )
                );
            }

            return impactorDtoList;
        }
    }
}
