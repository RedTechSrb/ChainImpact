using ChainImpactAPI.Models;

namespace ChainImpactAPI.Dtos
{
    public class CharityDto
    {
        public CharityDto(
            int? id,
            string? name,
            string? wallet,
            string? website,
            string? facebook,
            string? discord,
            string? twitter,
            string? imageurl,
            string? description)
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

    }
}
