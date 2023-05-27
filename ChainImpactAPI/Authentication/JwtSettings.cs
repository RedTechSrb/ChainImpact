namespace ChainImpactAPI.Authentication
{
    public class JwtSettings
    {
        public String Secret { get; init; } = null!;
        public String Issuer { get; init; } = null!;
        public String Audience { get; init; } = null!;
        public int ExpiryHours { get; init; }

    }
}
