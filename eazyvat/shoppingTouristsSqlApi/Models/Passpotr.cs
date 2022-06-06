using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace shoppingTouristsSqlApi.Models
{
    public class Passpotr
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid PassportId { get; set; }

        public string ReferencePdf { get; set; }  //?string

        public string UserId { get; set; }

        public string Nationality { get; set; } //LIST ?

        public string PassportNumber { get; set; }

        public DateTime Validity { get; set; }

        public DateTime DateIssue { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }
    }
}