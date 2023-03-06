using System.ComponentModel.DataAnnotations.Schema;

namespace ChainImpactAPI.Models
{
    public class Project : BaseEntity
    {

        [ForeignKey("CharityId")]
        public int charityid { get; set; }
        public Charity charity{ get; set; }
        public string name { get; set; }
        public string? wallet { get; set; }
        public string? description { get; set; }
        public string? milestones { get; set; }
        public double financialgoal { get; set; }
        public double totaldonated { get; set; }
        public string? website { get; set; }
        public string? facebook { get; set; }
        public string? discord { get; set; }
        public string? twitter { get; set; }
        public string? instagram { get; set; }
        public string? imageurl { get; set; }

        [ForeignKey("ImpactorId")]
        public int? impactorid { get; set; }
        public Impactor? impactor { get; set; }

        [ForeignKey("PrimaryCauseTypeId")]
        public int primarycausetypeid { get; set; }
        public CauseType primarycausetype { get; set; }

        [ForeignKey("SecondaryCauseTypeId")]
        public int secondarycausetypeid { get; set; }
        public CauseType secondarycausetype { get; set; }
    }
}
