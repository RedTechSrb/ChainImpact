using ChainImpactAPI.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace ChainImpactAPI.Dtos
{
    public class NFTTypeDto
    {
        public NFTTypeDto(
            int? id = null, 
            int? tier = null, 
            int? usertype = null, 
            CauseTypeDto? causetype = null, 
            string? imageurl = null, 
            double? minimaldonation = null, 
            string? symbol = null, 
            string? description = null)
        {
            this.id = id;
            this.tier = tier;
            this.usertype = usertype;
            this.causetype = causetype;
            this.imageurl = imageurl;
            this.minimaldonation = minimaldonation;
            this.symbol = symbol;
            this.description = description;
        }

        public int? id { get; set; }
        public int? tier { get; set; }
        public int? usertype { get; set; }
        public CauseTypeDto? causetype { get; set; }
        public string? imageurl { get; set; }
        public double? minimaldonation { get; set; }
        public string? symbol { get; set; }
        public string? description { get; set; }

    }
}
