using ChainImpactAPI.Models;
using System.Data;

namespace ChainImpactAPI.Models
{
    public class Impactor : BaseEntity
    {
        public Impactor()
        {
            this.wallet = wallet;
            this.role = 1;
            this.type = type;
        }

        public Impactor(string wallet, int type)
        {
            this.wallet = wallet;
            this.role = 1;
            this.type = type;
        }

        public Impactor(string wallet, int role, int type)
        {
            this.wallet = wallet;
            this.role = role;
            this.type = type;
        }

        public string wallet { get; set; }
        public string? name { get; set; }
        public string? description { get; set; }
        public string? website { get; set; }
        public string? facebook { get; set; }
        public string? discord { get; set; }
        public string? twitter { get; set; }
        public string? instagram { get; set; }
        public string? imageurl { get; set; }
        public int role { get; set; }
        public int type { get; set; }
        public bool confirmed { get; set; }
        public string password { get; set; }

    }
}