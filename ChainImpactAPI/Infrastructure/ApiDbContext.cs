using ChainImpactAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace ChainImpactAPI.Infrastructure
{
    public class ApiDbContext : DbContext
    {

        // Tables from database
        // Names has to be exact the same as in database
        public virtual DbSet<CauseType> causetype { get; set; }
        public virtual DbSet<Charity> charity { get; set; }
        public virtual DbSet<Donation> donation { get; set; }
        public virtual DbSet<Impactor> impactor { get; set; }
        public virtual DbSet<NFTOwner> nftowner { get; set; }
        public virtual DbSet<NFTType> nfttype { get; set; }
        public virtual DbSet<Project> project { get; set; }
        public virtual DbSet<Transaction> transaction { get; set; }
        public virtual DbSet<Milestone> milestone { get; set; }



        public ApiDbContext(DbContextOptions<ApiDbContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}
