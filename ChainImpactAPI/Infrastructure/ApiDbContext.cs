using ChainImpactAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace ChainImpactAPI.Infrastructure
{
    public class ApiDbContext : DbContext
    {

        // Tables from database
        // Names has to be exact the same as in database
        public virtual DbSet<Project> project { get; set; }
        public virtual DbSet<Charity> charity { get; set; }


        public ApiDbContext(DbContextOptions<ApiDbContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }

        public DbSet<ChainImpactAPI.Models.CauseType> CauseType { get; set; }

        public DbSet<ChainImpactAPI.Models.Donation> Donation { get; set; }


    }
}
