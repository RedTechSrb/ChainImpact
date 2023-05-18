namespace ChainImpactAPI.Dtos.SearchDtos
{
    public class DonationSearchDto
    {
        public DonationSearchDto()
        {
            this.projectType = null;
        }

        public string? projectType { get; set; }
        public int? projectid { get; set; }
    }
}
