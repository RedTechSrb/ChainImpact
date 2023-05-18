using ChainImpactAPI.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace ChainImpactAPI.Dtos
{
    public class TransactionDto
    {
        public TransactionDto(
            int? id = null, 
            string? blockchainaddress = null, 
            string? sender = null, 
            string? receiver = null, 
            double? amount = null,
            int? type = null,
            long? creationdate = null,
            DonationDto? donation = null,
            MilestoneDto? milestone = null)
        {
            this.id = id;
            this.blockchainaddress = blockchainaddress;
            this.sender = sender;
            this.receiver = receiver;
            this.amount = amount;
            this.donation = donation;
            this.milestone = milestone;
            this.creationdate = creationdate;
            this.type = type;
        }

        public int? id { get; set; }
        public string? blockchainaddress { get; set; }
        public string? sender { get; set; }
        public string? receiver { get; set; }
        public double? amount { get; set; }
        public DonationDto? donation { get; set; }
        public MilestoneDto? milestone { get; set; }
        public int? type { get; set; }
        public long? creationdate { get; set; }
    }
}
