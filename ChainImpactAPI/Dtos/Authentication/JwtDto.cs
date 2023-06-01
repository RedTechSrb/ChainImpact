using ChainImpactAPI.Models.Enums;

namespace ChainImpactAPI.Dtos.Authentication
{
    public record JwtDto (string wallet, ImpactorRole role);
}
