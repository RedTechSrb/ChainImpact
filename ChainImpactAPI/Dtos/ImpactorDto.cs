using ChainImpactAPI.Models;
using ChainImpactAPI.Models.Enums;

namespace ChainImpactAPI.Dtos
{
    public class ImpactorDto
    {
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
            ImpactorRole? role = null,
            ImpactorType? type = null,
            bool? confirmed = null,
            string? password = null,
            string? username = null,
            string? email = null)
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
            this.password = password;
            this.username = username;
            this.email = email;
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
        public ImpactorRole? role { get; set; }
        public ImpactorType? type { get; set; }
        public bool? confirmed { get; set; }
        public string? password { get; set; }
        public string? username { get; set; }
        public string? email { get; set; }
    }
}
