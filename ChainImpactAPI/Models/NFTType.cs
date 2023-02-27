using System.ComponentModel.DataAnnotations.Schema;

namespace ChainImpactAPI.Models
{
    public class NFTType : BaseEntity
    {
        public int? tier { get; set; }
        public int? usertype{ get; set; }
        public string? iamgeurl { get; set; }

        [ForeignKey("CauseTypeId")]
        public int causetypeid { get; set; }
        public CauseType causetype { get; set; }
        public double? minimaldonation{ get; set; }
    }
}
