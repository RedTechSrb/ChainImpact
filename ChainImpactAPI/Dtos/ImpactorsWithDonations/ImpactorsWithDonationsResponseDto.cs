namespace ChainImpactAPI.Dtos.ImpactorsWithDonations
{
    public class ImpactorsWithDonationsResponseDto
    {
        public string name { get; set; }
        public string wallet { get; set; }
        public double totalDonations { get; set; }
        public int userType { get; set; }
        public string imageUrl{ get; set; }
    }
}
