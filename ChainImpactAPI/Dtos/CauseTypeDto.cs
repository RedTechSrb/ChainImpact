namespace ChainImpactAPI.Dtos
{
    public class CauseTypeDto
    {
        public CauseTypeDto(
            int? id, 
            string? name)
        {
            this.id = id;
            this.name = name;
        }

        public int? id { get; set; }
        public string? name { get; set; }
    }
}
