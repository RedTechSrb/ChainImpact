using static System.Net.Mime.MediaTypeNames;

namespace ChainImpactAPI.Dtos.NFT
{
    public class NFTResponseDto
    {
        public string name { get; set; }
        public string symbol { get; set; }
        public string description { get; set; }
        public string external_url { get; set; }
        public string image { get; set; }
    }
}
