using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Easyvat.Model.Models
{
    public class Passport
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        public Guid? MemberId { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Nationality { get; set; }

        [MaxLength(50)]
        public string PassportNumber { get; set;}

        public DateTime ExpiredOn { get; set; }

        public DateTime IssueDate { get; set; }

        public DateTime BirthDate { get; set; }

        public string IssueIn { get; set; }

        public string ImagePassport { get; set; }

        public string ImageMember { get; set; }

        [ForeignKey(nameof(MemberId))]
        public virtual Member Member { get; set; }

        //[ForeignKey(nameof(Nationality))]
        //public virtual Country Country { get; set; }

        //public virtual List<Purchase> Purchases { get; set; }

    }
}
