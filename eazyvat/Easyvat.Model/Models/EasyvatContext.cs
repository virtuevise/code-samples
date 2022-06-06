using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Easyvat.Model.Models
{
    public partial class EasyvatContext : DbContext
    {
        public virtual DbSet<Member> Members { get; set; }
        public virtual DbSet<Shop> Shops { get; set; }
        public virtual DbSet<Passport> Passports { get; set; }
        public virtual DbSet<Purchase> Purchases { get; set; }  
        public virtual DbSet<Item> Items { get; set; }
        public virtual DbSet<Visit> Visits { get; set; }
        public virtual DbSet<VisitArea> VisitAreas { get; set; }
        public virtual DbSet<VisitCity> VisitCities { get; set; }
        public virtual DbSet<VisitInterest> VisitInterests { get; set; }
        public virtual DbSet<VisitPurpose> VisitPurposes { get; set; }
        public virtual DbSet<Country> Countries { get; set; }
        public virtual DbSet<SavedCards> Creditcards { get; set; }
        




        public EasyvatContext(DbContextOptions<EasyvatContext> options) : base(options)
        {  
           

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //unique constraint
            modelBuilder.Entity<Passport>().HasIndex(p => new { p.PassportNumber,p.Nationality });
        }

    }
}
