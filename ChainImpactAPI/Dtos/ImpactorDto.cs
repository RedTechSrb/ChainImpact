using ChainImpactAPI.Models;

namespace ChainImpactAPI.Dtos
{
    public class ImpactorDto
    {
        public ImpactorDto() 
        { 

        }

        public ImpactorDto(
            int? id, 
            string? wallet, 
            string? name, 
            string? description, 
            string? website, 
            string? facebook, 
            string? discord, 
            string? twitter, 
            string? instagram, 
            string? imageurl, 
            int? role, 
            int? type)
        {
            this.id = id;
            this.wallet = wallet;
            this.name = name;
            this.description = description;
            this.website = website;
            this.facebook = facebook;
            this.discord = discord;
            this.twitter = twitter;
            this.instagram = instagram;
            this.imageurl = imageurl;
            this.role = role;
            this.type = type;
        }

        public int? id { get; set; }
        public string? wallet { get; set; }
        public string? name { get; set; }
        public string? description { get; set; }
        public string? website { get; set; }
        public string? facebook { get; set; }
        public string? discord { get; set; }
        public string? twitter { get; set; }
        public string? instagram { get; set; }
        public string? imageurl { get; set; }
        public int? role { get; set; }
        public int? type { get; set; }

    }
}
