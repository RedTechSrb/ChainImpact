namespace ChainImpactAPI.Dtos.SearchDtos
{
    public class ProjectSearchDto
    {
        public ProjectSearchDto()
        {
            this.id = null;
        }

        public ProjectSearchDto(int? id)
        {
            this.id = id;
        }

        public int? id { get; set; }
    }
}
