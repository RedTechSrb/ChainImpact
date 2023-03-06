using ChainImpactAPI.Application.RepositoryInterfaces;
using ChainImpactAPI.Application.ServiceInterfaces;
using ChainImpactAPI.Dtos;
using ChainImpactAPI.Dtos.ImpactorWithWallet;
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

            var impactor = impactorRepository.SearchAsync(new GenericDto<ImpactorDto>(new ImpactorDto { wallet = impactorDto.wallet })).Result.FirstOrDefault();
            if (impactor == null)
            {
                impactor= new Impactor(impactorDto.wallet, impactorDto.type.Value);
            } else
            {
                impactor.name = impactorDto.name != null ? impactorDto.name : impactor.name;
                impactor.description = impactorDto.description != null ? impactorDto.description : impactor.description;
                impactor.website = impactorDto.website != null ? impactorDto.website : impactor.website;
                impactor.facebook = impactorDto.facebook != null ? impactorDto.facebook : impactor.facebook;
                impactor.discord = impactorDto.discord != null ? impactorDto.discord : impactor.discord;
                impactor.twitter = impactorDto.twitter != null ? impactorDto.twitter : impactor.twitter;
                impactor.instagram = impactorDto.instagram != null ? impactorDto.instagram : impactor.instagram;
                impactor.imageurl = impactorDto.imageurl != null ? impactorDto.imageurl : impactor.imageurl;
                impactor.type = impactorDto.type != null ? impactorDto.type.Value : impactor.type;
                impactor.role = impactorDto.role != null ? impactorDto.role.Value : impactor.role;  
            }

            return impactorRepository.Save(impactor);
        }

        public ImpactorDto? GetImpactorWithWallet(ImpactorWithWalletRequestDto impactorWithWalletRequestDto)
        {
            var impactor = impactorRepository.SearchAsync(new GenericDto<ImpactorDto>(new ImpactorDto { wallet = impactorWithWalletRequestDto.wallet })).Result.FirstOrDefault();

            if(impactor == null)
            {
                return null;
            }

            var impactorDto = new ImpactorDto(
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
                        );

            return impactorDto;

        }

    }
}
