namespace ChainImpactAPI.Dtos.SaveDonation
{
    public class SaveDonationRequestDto
    {
        public double amount { get; set; }
        public int projectid { get; set; }
        public string wallet { get; set; }
        public string blockchainaddress { get; set; }
        public long creationdate { get; set; }
    }
}
