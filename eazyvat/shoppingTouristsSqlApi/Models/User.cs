using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace shoppingTouristsSqlApi.Models
{
    public class User
    {

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid UserId { get; set; }
        
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Status { get; set; }  //active/inactive?

        public string isTourist { get; set; }  //yes/no?

        public string Address { get; set; }

        public string MobileNumber { get; set; }

        public string Email { get; set; }


    }
}