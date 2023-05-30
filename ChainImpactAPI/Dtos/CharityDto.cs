using ChainImpactAPI.Models;

namespace ChainImpactAPI.Dtos
{
    public class CharityDto
    {
        public CharityDto(
            int? id = null,
            string? name = null,
            string? wallet = null,
            string? website = null,
            string? facebook = null,
            string? discord = null,
            string? twitter = null,
            string? imageurl = null,
            string? description = null,
            string? instagram = null,
            bool? confirmed = null,
            string? email = null)
        {
            this.id = id;
            this.name = name;
            this.wallet = wallet;
            this.website = website;
            this.facebook = facebook;
            this.discord = discord;
            this.twitter = twitter;
            this.imageurl = imageurl;
            this.description = description;
            this.instagram = instagram;
            this.confirmed = confirmed;
            this.email = email;
        }

        public int? id { get; set; }
        public string? name { get; set; }
        public string? wallet { get; set; }
        public string? website { get; set; }
        public string? facebook { get; set; }
        public string? discord { get; set; }
        public string? twitter { get; set; }
        public string? imageurl { get; set; }
        public string? description { get; set; }
        public string? instagram { get; set; }
        public bool? confirmed { get; set; }
        public string? email { get; set; }

    }
}
