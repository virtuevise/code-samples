using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Easyvat.Model.Models
{
    public class Member
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        public string Status { get; set; }  //active/inactive?

        public bool IsTourist { get; set; }  //yes/no?

        public string Address { get; set; }

        public string RegionMobileNumber { get; set; }
        public string MobileNumber { get; set; }

        public string Email { get; set; }
        public bool SpecialOffers { get; set; }
        public virtual List<Passport> Passports { get; set; }

        public virtual List<Visit> Visits { get; set; }
    }
}