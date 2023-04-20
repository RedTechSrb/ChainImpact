using static System.Net.Mime.MediaTypeNames;

namespace ChainImpactAPI.Dtos.NFTOwns
{
    public class NFTOwnsResponseDto
    {
        public NFTOwnsResponseDto(string name, string imageurl, int tier)
        {
            this.name = name;
            this.imageurl = imageurl;
            this.tier = tier;
        }

        public string name { get; set; }
        public string imageurl { get; set; }
        public int tier { get; set; }
    }
}
