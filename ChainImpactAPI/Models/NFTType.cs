using System.ComponentModel.DataAnnotations.Schema;

namespace ChainImpactAPI.Models
{
    public class NFTType : BaseEntity
    {
        public int tier { get; set; }
        public int usertype{ get; set; }
        public string imageurl { get; set; }

        [ForeignKey("CauseTypeId")]
        public int causetypeid { get; set; }
        public CauseType causetype { get; set; }
        public double minimaldonation{ get; set; }
        public string symbol { get; set; }  
        public string description { get; set; }
    }
}
