using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using sk_travel.DAL.Tables;

namespace sk_travel.DAL.Context
{
    public class TableContext : IdentityDbContext<UserTbl>
    {
        public TableContext(DbContextOptions obj) : base(obj)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            UserTbl user = new UserTbl()
            {
                Id = "b74ddd14-6340-4840-95c2-db12554843e5",
                FirstName = "skadmin",
                LastName = "admin",
                UserName = "SKADMIN",
                Email = "skadmin@gmail.com",
                PhoneNumber = "1234567890",
                EmailConfirmed = true,
                PhoneNumberConfirmed = true,
                LockoutEnabled = false,
            };

            PasswordHasher<UserTbl> passwordHasher = new PasswordHasher<UserTbl>();
            var password = passwordHasher.HashPassword(user, "Skadmin*123");

            UserTbl users = new UserTbl()
            {
                Id = "b74ddd14-6340-4840-95c2-db12554843e5",
                FirstName = "skadmin",
                LastName = "admin",
                UserName = "SKADMIN",
                Email = "skadmin@gmail.com",
                PhoneNumber = "1234567890",
                PasswordHash = password,
                EmailConfirmed = true,
                PhoneNumberConfirmed = true,
                LockoutEnabled = false,
            };

            modelBuilder.Entity<UserTbl>().HasData(users);

            modelBuilder.Entity<IdentityRole>().HasData(
                new IdentityRole()
                {
                    Id = "fab4fac1-c546-41de-aebc-a14da6895711",
                    Name = "Admin",
                    ConcurrencyStamp = "1",
                    NormalizedName = "Admin"
                }
                );

            modelBuilder.Entity<IdentityUserRole<string>>().HasData(
                new IdentityUserRole<string>() { RoleId = "fab4fac1-c546-41de-aebc-a14da6895711", UserId = "b74ddd14-6340-4840-95c2-db12554843e5" }
                );

            modelBuilder.Entity<Sk_Locations>().HasData(
              new Sk_Locations()
              {
                  id = new Guid("6D4E6685-F722-43CF-BB26-20FC922FDC34"),
                  Name = "delhi",
                  Code = "101",
                  IsActive = true,
                  IsDeleted = false,
                  CreatedBy = new Guid("023C38EA-2A0C-4F8E-A037-6488B9463298"),
                  CreatedAt = DateTime.UtcNow
              },
             new Sk_Locations()
             {
                 id = new Guid("522C0D59-637C-49F6-844D-0F342A0878D6"),
                 Name = "mumbai",
                 Code = "102",
                 IsActive = true,
                 IsDeleted = false,
                 CreatedBy = new Guid("023C38EA-2A0C-4F8E-A037-6488B9463298"),
                 CreatedAt = DateTime.UtcNow
             },
             new Sk_Locations()
             {
                 id = new Guid("ADA8287F-3A68-42E7-9A70-0683DFF50806"),
                 Name = "uttarakhand",
                 Code = "103",
                 IsActive = true,
                 IsDeleted = false,
                 CreatedBy = new Guid("023C38EA-2A0C-4F8E-A037-6488B9463298"),
                 CreatedAt = DateTime.UtcNow
             }
         );

            modelBuilder.Entity<Sk_Flight_info>().HasData(
             new Sk_Flight_info()
             {
                 id = new Guid("0ad39fe9-9a0e-48e1-b76e-ccb8da2a70ac"),
                 Flight_name = "AirAsia India",
                 IsActive = true,
                 IsDeleted = false,
                 CreatedBy = new Guid("023C38EA-2A0C-4F8E-A037-6488B9463298"),
                 CreatedAt = DateTime.UtcNow

             },
            new Sk_Flight_info()
            {
                id = new Guid("60a85f4f-c3ff-4a62-8802-2dad8f7c7a81"),
                Flight_name = "Air India",
                IsActive = true,
                IsDeleted = false,
                CreatedBy = new Guid("023C38EA-2A0C-4F8E-A037-6488B9463298"),
                CreatedAt = DateTime.UtcNow
            },
            new Sk_Flight_info()
            {
                id = new Guid("50807dcf-5eb3-45c3-8d1b-a7fd29947b99"),
                Flight_name = "Air India Express",
                IsActive = true,
                IsDeleted = false,
                CreatedBy = new Guid("023C38EA-2A0C-4F8E-A037-6488B9463298"),
                CreatedAt = DateTime.UtcNow
            }
        );

            modelBuilder.Entity<Sk_VeiwModuleTbl>().HasData(
             new Sk_VeiwModuleTbl()
             {
                 id = new Guid("145E5F92-95E8-4159-99BB-0EBD69D05C47"),
                 ModuleName = "add-users",
                 DisplayName = "Add Users",
                 IsActive = true,
                 IsDeleted = false,
                 CreatedBy = new Guid("023C38EA-2A0C-4F8E-A037-6488B9463298"),
                 CreatedAt = DateTime.UtcNow

             },
              new Sk_VeiwModuleTbl()
              {
                  id = new Guid("182BDD5B-3504-4D6D-ADB3-FB60E7EFCCFF"),
                  ModuleName = "update-users",
                  DisplayName = "Update Users",
                  IsActive = true,
                  IsDeleted = false,
                  CreatedBy = new Guid("023C38EA-2A0C-4F8E-A037-6488B9463298"),
                  CreatedAt = DateTime.UtcNow

              },
               new Sk_VeiwModuleTbl()
               {
                   id = new Guid("8B933E2B-4D0C-4053-ACD0-4B3F358C957A"),
                   ModuleName = "delete-users",
                   DisplayName = "Delete Users",
                   IsActive = true,
                   IsDeleted = false,
                   CreatedBy = new Guid("023C38EA-2A0C-4F8E-A037-6488B9463298"),
                   CreatedAt = DateTime.UtcNow

               },
            new Sk_VeiwModuleTbl()
            {
                id = new Guid("974FE5D7-1D3F-466A-8A63-167CB48EADB5"),
                ModuleName = "add-locations",
                DisplayName = "Add Locations",
                IsActive = true,
                IsDeleted = false,
                CreatedBy = new Guid("023C38EA-2A0C-4F8E-A037-6488B9463298"),
                CreatedAt = DateTime.UtcNow
            },
             new Sk_VeiwModuleTbl()
             {
                 id = new Guid("D4857A39-6AAD-4772-B014-5FA0B31B12B1"),
                 ModuleName = "update-locations",
                 DisplayName = "Update Locations",
                 IsActive = true,
                 IsDeleted = false,
                 CreatedBy = new Guid("023C38EA-2A0C-4F8E-A037-6488B9463298"),
                 CreatedAt = DateTime.UtcNow
             },
              new Sk_VeiwModuleTbl()
              {
                  id = new Guid("8B0A6448-11CD-417D-9014-79294BF3C703"),
                  ModuleName = "delete-locations",
                  DisplayName = "Delete Locations",
                  IsActive = true,
                  IsDeleted = false,
                  CreatedBy = new Guid("023C38EA-2A0C-4F8E-A037-6488B9463298"),
                  CreatedAt = DateTime.UtcNow
              },
            new Sk_VeiwModuleTbl()
            {
                id = new Guid("55DA6F93-BFE2-4DD1-9141-FA6E7B8EC737"),
                ModuleName = "add-flight-info-details",
                DisplayName = "Add Flight Info Details",
                IsActive = true,
                IsDeleted = false,
                CreatedBy = new Guid("023C38EA-2A0C-4F8E-A037-6488B9463298"),
                CreatedAt = DateTime.UtcNow
            },
             new Sk_VeiwModuleTbl()
             {
                 id = new Guid("56784BFD-0D8C-4E75-8F0E-9561B25079B1"),
                 ModuleName = "update-flight-info-details",
                 DisplayName = "Update Flight Info Details",
                 IsActive = true,
                 IsDeleted = false,
                 CreatedBy = new Guid("023C38EA-2A0C-4F8E-A037-6488B9463298"),
                 CreatedAt = DateTime.UtcNow
             },
              new Sk_VeiwModuleTbl()
              {
                  id = new Guid("48DED4E4-5C73-4D84-9C25-2BFEE9B05914"),
                  ModuleName = "delete-flight-info-details",
                  DisplayName = "Delete Flight Info Details",
                  IsActive = true,
                  IsDeleted = false,
                  CreatedBy = new Guid("023C38EA-2A0C-4F8E-A037-6488B9463298"),
                  CreatedAt = DateTime.UtcNow
              },
            new Sk_VeiwModuleTbl()
            {
                id = new Guid("271B7F76-8879-48C5-A345-5467A725D363"),
                ModuleName = "add-flight-map",
                DisplayName = "Add Flight Map",
                IsActive = true,
                IsDeleted = false,
                CreatedBy = new Guid("023C38EA-2A0C-4F8E-A037-6488B9463298"),
                CreatedAt = DateTime.UtcNow
            },
            new Sk_VeiwModuleTbl()
            {
                id = new Guid("4C63E7AA-D1E8-4570-8AD8-B4A853270EF4"),
                ModuleName = "update-flight-map",
                DisplayName = "Update Flight Map",
                IsActive = true,
                IsDeleted = false,
                CreatedBy = new Guid("023C38EA-2A0C-4F8E-A037-6488B9463298"),
                CreatedAt = DateTime.UtcNow
            },
            new Sk_VeiwModuleTbl()
            {
                id = new Guid("EF288D97-34B6-447D-AF15-0C3B3194F03C"),
                ModuleName = "delete-flight-map",
                DisplayName = "Delete Flight Map",
                IsActive = true,
                IsDeleted = false,
                CreatedBy = new Guid("023C38EA-2A0C-4F8E-A037-6488B9463298"),
                CreatedAt = DateTime.UtcNow
            },
            new Sk_VeiwModuleTbl()
            {
                id = new Guid("F482CDAF-672B-46FF-B5E7-976F67548135"),
                ModuleName = "add-roles",
                DisplayName = "Add Roles",
                IsActive = true,
                IsDeleted = false,
                CreatedBy = new Guid("023C38EA-2A0C-4F8E-A037-6488B9463298"),
                CreatedAt = DateTime.UtcNow
            },
            new Sk_VeiwModuleTbl()
            {
                id = new Guid("E91392DD-206D-4A65-955C-4B903E7E7F50"),
                ModuleName = "update-roles",
                DisplayName = "Update Roles",
                IsActive = true,
                IsDeleted = false,
                CreatedBy = new Guid("023C38EA-2A0C-4F8E-A037-6488B9463298"),
                CreatedAt = DateTime.UtcNow
            },
            new Sk_VeiwModuleTbl()
            {
                id = new Guid("5FAE20B8-0C34-4F64-B3C3-C9179A9AEDDA"),
                ModuleName = "delete-roles",
                DisplayName = "Delete Roles",
                IsActive = true,
                IsDeleted = false,
                CreatedBy = new Guid("023C38EA-2A0C-4F8E-A037-6488B9463298"),
                CreatedAt = DateTime.UtcNow
            }
        );

          //  modelBuilder.Entity<Sk_Flight_Info_Details>().HasData(
          //   new Sk_Flight_Info_Details()
          //   {
          //       Id = 1,
          //       Fligth_code = "I5",
          //       Fligth_type = "Low cost",
          //       IsActive = true,
          //       IsDeleted = false,
          //       CreatedBy = "admin",
          //       Created_DateTime = DateTime.UtcNow
          //   },
          //  new Sk_Flight_Info_Details()
          //  {
          //      id = 2,
          //      fligth_code = "AI",
          //      fligth_type = "Full service",
          //      IsActive = true,
          //      IsDeleted = false,
          //      CreatedBy = "admin",
          //      Created_DateTime = DateTime.UtcNow
          //  },
          //  new Sk_Flight_Info_Details()
          //  {
          //      id = 3,
          //      fligth_code = "IX",
          //      fligth_type = "Low cost",
          //      IsActive = true,
          //      IsDeleted = false,
          //      CreatedBy = "admin",
          //      Created_DateTime = DateTime.UtcNow
          //  }
          //);
        }

        public virtual DbSet<Sk_Locations> Sk_Location { get; set; }
        public virtual DbSet<Sk_Flight_info> Sk_Flight_info { get; set; }
        public virtual DbSet<Sk_Flight_Info_Details> Sk_Flight_Info_Details { get; set; }
        public virtual DbSet<Sk_Flight_location_Mapping> Sk_Fligth_location_Mapping { get; set; }
        public virtual DbSet<Sk_Flight_date_Mapping> Sk_Flight_date_Mapping { get; set; }
        public virtual DbSet<Sk_VeiwModuleTbl> Sk_VeiwModuleTbl { get; set; }
        public virtual DbSet<Sk_RoleModuleMapping> Sk_RoleModuleMapping { get; set; }


        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = new CancellationToken())
        {
            this.ChangeTracker.DetectChanges();

            foreach (var entry in ChangeTracker.Entries().ToList())
            {
                switch (entry.State)
                {
                    case EntityState.Deleted:
                        if (entry.Metadata.Name != "sk_travel.DAL.Tables.UserTbl" && entry.Metadata.Name != "Microsoft.AspNetCore.Identity.IdentityRole" && entry.Metadata.Name != "sk_travel.DAL.Tables.UserTbl" && entry.Metadata.Name != "Microsoft.AspNetCore.Identity.IdentityUserRole<string>")
                        {
                            entry.Entity.GetType().GetProperty("DeletedBy").SetValue(entry.Entity, new Guid("C7670648-5FC0-4B63-B490-B2C51A5B9B33"));
                            entry.Entity.GetType().GetProperty("DeletedAt").SetValue(entry.Entity, DateTime.UtcNow);
                        }

                        break;
                    case EntityState.Modified:
                        if (entry.Metadata.Name != "sk_travel.DAL.Tables.UserTbl" && entry.Metadata.Name != "Microsoft.AspNetCore.Identity.IdentityRole" && entry.Metadata.Name != "sk_travel.DAL.Tables.UserTbl" && entry.Metadata.Name != "Microsoft.AspNetCore.Identity.IdentityUserRole<string>")
                        {
                            entry.Entity.GetType().GetProperty("ModifiedBy").SetValue(entry.Entity, new Guid("C7670648-5FC0-4B63-B490-B2C51A5B9B33"));
                            entry.Entity.GetType().GetProperty("ModifiedAt").SetValue(entry.Entity, DateTime.UtcNow);
                        }
                        break;
                    case EntityState.Added:
                        if (entry.Metadata.Name != "sk_travel.DAL.Tables.UserTbl" && entry.Metadata.Name != "Microsoft.AspNetCore.Identity.IdentityRole" && entry.Metadata.Name != "sk_travel.DAL.Tables.UserTbl" && entry.Metadata.Name != "Microsoft.AspNetCore.Identity.IdentityUserRole<string>")
                        {
                            entry.Entity.GetType().GetProperty("CreatedBy").SetValue(entry.Entity, new Guid("C7670648-5FC0-4B63-B490-B2C51A5B9B33"));
                            entry.Entity.GetType().GetProperty("CreatedAt").SetValue(entry.Entity, DateTime.UtcNow);
                        }
                        break;
                    default:
                        break;
                }
            }
            return await base.SaveChangesAsync(cancellationToken);
        }
    }
}
