

namespace ChainImpactAPI.Dtos
{
    public class MilestoneDto
    {

        public MilestoneDto(
            int? id = null,
            string? name = null,
            string? description = null,
            string? complete = null,
            ProjectDto? project = null)
        {
            this.id = id;
            this.name = name;
            this.description = description;
            this.complete = complete;
            this.project = project;
        }

        public int? id { get; set; }
        public string? name { get; set; }
        public string? description { get; set; }
        public string? complete { get; set; }
        public ProjectDto? project { get; set; }

    }
}