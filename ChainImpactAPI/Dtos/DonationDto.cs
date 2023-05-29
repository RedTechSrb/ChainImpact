using ChainImpactAPI.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace ChainImpactAPI.Dtos
{
    public class DonationDto
    {
        public DonationDto()
        {
        }

        public DonationDto(int? id, double? amount, long? creationdate, ProjectDto? project, ImpactorDto? donator)
        {
            this.id = id;
            this.amount = amount;
            this.project = project;
            this.donator = donator;
            this.creationdate = creationdate;
        }

        public int? id { get; set; }
        public double? amount { get; set; }
        public ProjectDto? project { get; set; }
        public ImpactorDto? donator { get; set; }
        public long? creationdate { get; set; }
    }
}
