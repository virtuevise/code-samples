using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace shoppingTouristsSqlApi.Models
{
    public class Shop
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid ShopId { get; set; }

        public string RegistrationNumber { get; set; }

        public string Sector { get; set; }  //?list

        public string Name { get; set; }

        public string Address { get; set; }

        public string City { get; set; }

        public int BranchNumber { get; set; }

        public string Phone { get; set; }

        public string UserName { get; set; }

        public string Password { get; set; }

        public long? VatNumberShop { get; set; }

    }
}