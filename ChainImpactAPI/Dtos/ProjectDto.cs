namespace ChainImpactAPI.Dtos
{
    public class ProjectDto
    {
        public ProjectDto(int id, string name)
        {
            Id = id;
            Name = name;
        }

        public int Id { get; set; }
        public string Name { get; set; }
    }
}
