using System.ComponentModel.DataAnnotations.Schema;

namespace ChainImpactAPI.Models
{
    public class Donation : BaseEntity
    {
        public double amount { get; set; }

        [ForeignKey("ProjectId")]
        public int projectid { get; set; }
        public Project project{ get; set; }

        [ForeignKey("DonatorId")]
        public int donatorid { get; set; }
        public Impactor donator { get; set; }

    }
}
