using ChainImpactAPI.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace ChainImpactAPI.Dtos
{
    public class ProjectDto
    {
        public ProjectDto(
            int? id = null, 
            CharityDto? charity = null, 
            string? wallet = null, 
            string? name = null, 
            string? description = null, 
            double? financialgoal = null, 
            double? totaldonated = null, 
            int? totalbackers = null, 
            string? website = null, 
            string? facebook = null, 
            string? discord = null, 
            string? twitter = null, 
            string? instagram = null, 
            string? imageurl = null, 
            ImpactorDto? angelimpactor = null, 
            CauseTypeDto? primarycausetype = null, 
            CauseTypeDto? secondarycausetype = null)
        {
            this.id = id;
            this.charity = charity;
            this.wallet = wallet;
            this.name = name;
            this.description = description;
            this.financialgoal = financialgoal;
            this.totaldonated = totaldonated;
            this.totalbackers = totalbackers;
            this.website = website;
            this.facebook = facebook;
            this.discord = discord;
            this.twitter = twitter;
            this.instagram = instagram;
            this.imageurl = imageurl;
            this.angelimpactor = angelimpactor;
            this.primarycausetype = primarycausetype;
            this.secondarycausetype = secondarycausetype;
        }

        public int? id { get; set; }
        public CharityDto? charity { get; set; }
        public string? wallet { get; set; }
        public string? name { get; set; }
        public string? description { get; set; }
        public double? financialgoal { get; set; }
        public double? totaldonated { get; set; }
        public int? totalbackers { get; set; }
        public string? website { get; set; }
        public string? facebook { get; set; }
        public string? discord { get; set; }
        public string? twitter { get; set; }
        public string? instagram { get; set; }
        public string? imageurl { get; set; }
        public ImpactorDto? angelimpactor { get; set; }
        public CauseTypeDto? primarycausetype { get; set; }
        public CauseTypeDto? secondarycausetype { get; set; }
    }
}
