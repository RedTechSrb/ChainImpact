using System.ComponentModel.DataAnnotations.Schema;
using System.Numerics;

namespace ChainImpactAPI.Models
{
    public class Milestone : BaseEntity
    {
        public string name { get; set; }
        public int ordernumber { get; set; }
        public string? description { get; set; }
        public long? complete { get; set; }

        [ForeignKey("ProjectId")]
        public int projectid { get; set; }
        public Project project { get; set; }

    }
}