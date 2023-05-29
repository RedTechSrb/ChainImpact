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

        [ForeignKey("DonationId")]
        public int? donationid { get; set; }
        public Donation donation { get; set; }

        [ForeignKey("MilestoneId")]
        public int? milestoneid { get; set; }
        public Milestone milestone { get; set; }
        public int type { get; set; }
        public long? creationdate { get; set; }

    }
}