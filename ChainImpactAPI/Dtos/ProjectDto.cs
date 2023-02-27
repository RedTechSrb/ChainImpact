using ChainImpactAPI.Models;

namespace ChainImpactAPI.Dtos
{
    public class ProjectDto
    {
        public ProjectDto(int id, int charity, string name, string? description, string? milestones, double finantialgoal, double totaldonated, string? website, string? facebook, string? discord, string? twitter, string? instagram, string? imageurl)
        {
            this.charity = charity;
            this.name = name;
            this.description = description;
            this.milestones = milestones;
            this.finantialgoal = finantialgoal;
            this.totaldonated = totaldonated;
            this.website = website;
            this.facebook = facebook;
            this.discord = discord;
            this.twitter = twitter;
            this.instagram = instagram;
            this.imageurl = imageurl;
        }

        public int id { get; set; }
        public int charity { get; set; }
        public string name { get; set; }
        public string? description { get; set; }
        public string? milestones { get; set; }
        public double finantialgoal { get; set; }
        public double totaldonated { get; set; }
        public string? website { get; set; }
        public string? facebook { get; set; }
        public string? discord { get; set; }
        public string? twitter { get; set; }
        public string? instagram { get; set; }
        public string? imageurl { get; set; }
    }
}
