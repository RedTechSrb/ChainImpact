using ChainImpactAPI.Application.RepositoryInterfaces;
using ChainImpactAPI.Application.ServiceInterfaces;
using ChainImpactAPI.Dtos;
using ChainImpactAPI.Infrastructure.Repositories;
using ChainImpactAPI.Models;

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
                            impactor.id,
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

        public Impactor SaveImpactor(ImpactorDto impactorDto)
        {
            return null;
/*            var impactor = impactorRepository.Update(new Impactor
            {
                id = impactorDto.id,
                wallet = impactorDto.wallet,
                name= impactorDto.name,
                description= impactorDto.description,
                discord= impactorDto.discord,
                facebook= impactorDto.facebook,  
                twitter= impactorDto.twitter,
                instagram= impactorDto.instagram,
                imageurl= impactorDto.imageurl,
                website= impactorDto.website,
                type= impactorDto.type.Value,
                role= (int)UserType.User
            });

            return impactor;*/
        }
    }
}
