namespace ChainImpactAPI.Dtos.ImpactorsWithProjects
{
    public class ImpactorsWithProjectsResponseDto
    {
        public ImpactorsWithProjectsResponseDto()
        {
        }

        public ImpactorsWithProjectsResponseDto(ImpactorDto? impactor, List<DonatedProjectDto>? donatedProjects)
        {
            this.impactor = impactor;
            this.donatedProjects = donatedProjects;
        }

        public ImpactorDto? impactor { get; set; }
        public List<DonatedProjectDto>? donatedProjects { get; set; }
    }
}
