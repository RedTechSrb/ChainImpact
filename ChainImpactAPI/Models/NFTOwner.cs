using System.ComponentModel.DataAnnotations.Schema;

namespace ChainImpactAPI.Models
{
    public class NFTOwner : BaseEntity
    {
        [ForeignKey("NftTypeId")]
        public int nfttypeid { get; set; }
        public NFTType nfttype { get; set; }

        [ForeignKey("ImpactorId")]
        public int impactorid { get; set; }
        public Impactor impactor { get; set; }
    }
}
