using ChainImpactAPI.Models;

namespace ChainImpactAPI.Dtos
{
    public class ImpactorDto
    {
        public ImpactorDto() 
        { 

        }

        public ImpactorDto(
            int? id = null, 
            string? wallet = null,
            string? name = null,
            string? description = null, 
            string? website = null, 
            string? facebook = null, 
            string? discord = null, 
            string? twitter = null, 
            string? instagram = null, 
            string? imageurl = null, 
            int? role = null, 
            int? type = null,
            bool? confirmed = null)
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
            this.confirmed = confirmed;
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
        public bool? confirmed { get; set; }

    }
}
