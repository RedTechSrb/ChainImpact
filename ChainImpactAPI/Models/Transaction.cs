using ChainImpactAPI.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace ChainImpactAPI.Models
{
    public class Transaction : BaseEntity
    {
        public string blockchainaddress { get; set; }
        public string? sender { get; set; }
        public string? receiver { get; set; }
        public double? amount { get; set; }

        [ForeignKey("ProjectId")]
        public int projectid { get; set; }
        public Project project { get; set; }

        [ForeignKey("DonatorId")]
        public int donatorid { get; set; }
        public Impactor donator { get; set; }

        [ForeignKey("MilestoneId")]
        public int? milestoneid { get; set; }
        public Milestone milestone { get; set; }

    }
}