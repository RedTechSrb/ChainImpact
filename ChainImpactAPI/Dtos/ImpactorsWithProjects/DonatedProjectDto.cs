namespace ChainImpactAPI.Dtos.ImpactorsWithProjects
{
    public class DonatedProjectDto
    {
        public DonatedProjectDto(ProjectDto? project, double totalDonation)
        {
            this.project = project;
            this.totalDonation = totalDonation;
        }

        public ProjectDto? project { get; set; }
        public double? totalDonation { get; set; }
    }
}