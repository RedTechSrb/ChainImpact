using System.Xml.Linq;

namespace ChainImpactAPI.Models
{
    public class Charity : BaseEntity
    {
        public string name { get; set; }
        public string? wallet { get; set; }
        public string? website { get; set; }
        public string? facebook { get; set; }
        public string? discord { get; set; }
        public string? twitter { get; set; }
        public string? imageurl { get; set; }
        public string? description { get; set; }
        public string? instagram { get; set; }
        public bool confirmed { get; set; }
        public string email { get; set; }

    }
}
