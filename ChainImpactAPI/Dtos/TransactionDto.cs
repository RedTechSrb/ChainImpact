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
            ProjectDto? project = null, 
            ImpactorDto? donator = null,
            MilestoneDto? milestone = null)
        {
            this.id = id;
            this.blockchainaddress = blockchainaddress;
            this.sender = sender;
            this.receiver = receiver;
            this.amount = amount;
            this.project = project;
            this.donator = donator;
            this.milestone = milestone;
        }

        public int? id { get; set; }
        public string? blockchainaddress { get; set; }
        public string? sender { get; set; }
        public string? receiver { get; set; }
        public double? amount { get; set; }
        public ProjectDto? project { get; set; }
        public ImpactorDto? donator { get; set; }
        public MilestoneDto? milestone { get; set; }
    }
}
