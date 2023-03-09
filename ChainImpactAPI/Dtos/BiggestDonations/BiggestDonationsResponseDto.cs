namespace ChainImpactAPI.Dtos.BiggestDonations
{
    public class BiggestDonationsResponseDto
    {
        public BiggestDonationsResponseDto(ImpactorDto? impactor, double? amount)
        {
            this.impactor = impactor;
            this.amount = amount;
        }

        public ImpactorDto? impactor { get; set; }
        public double? amount { get; set; }
    }
}
