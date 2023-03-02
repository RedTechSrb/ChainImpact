using ChainImpactAPI.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace ChainImpactAPI.Dtos
{
    public class ProjectDto
    {
        public ProjectDto(int? id, Charity charity, string name, string? description, string? milestones, double financialgoal, double totaldonated, string? website, string? facebook, string? discord, string? twitter, string? instagram, string? imageurl, Impactor? impactor, CauseType primarycausetype, CauseType secondarycausetype)
        {
            this.id = id;
            this.charity = charity;
            this.name = name;
            this.description = description;
            this.milestones = milestones;
            this.financialgoal = financialgoal;
            this.totaldonated = totaldonated;
            this.website = website;
            this.facebook = facebook;
            this.discord = discord;
            this.twitter = twitter;
            this.instagram = instagram;
            this.imageurl = imageurl;
            this.angelimpactor = impactor;
            this.primarycausetype = primarycausetype;
            this.secondarycausetype = secondarycausetype;
        }

        public int? id { get; set; }
        public Charity charity { get; set; }
        public string name { get; set; }
        public string? description { get; set; }
        public string? milestones { get; set; }
        public double financialgoal { get; set; }
        public double totaldonated { get; set; }
        public string? website { get; set; }
        public string? facebook { get; set; }
        public string? discord { get; set; }
        public string? twitter { get; set; }
        public string? instagram { get; set; }
        public string? imageurl { get; set; }
        public Impactor? angelimpactor { get; set; }
        public CauseType primarycausetype { get; set; }
        public CauseType secondarycausetype { get; set; }
    }
}
