namespace ChainImpactAPI.Dtos.NFTLeft
{
    public class NFTLeftResponseDto
    {
        public NFTLeftResponseDto()
        {
        }

        public NFTLeftResponseDto(double amountleft, string imageurl, int tier)
        {
            this.amountleft = amountleft;
            this.imageurl = imageurl;
            this.tier = tier;
        }

        public double amountleft { get; set; }
        public string imageurl { get; set; }
        public int tier { get; set; }
    }
}
