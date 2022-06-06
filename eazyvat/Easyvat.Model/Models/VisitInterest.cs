using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Easyvat.Model.Models
{
    public class VisitInterest
    {
        [Key]
        public int Id { get; set; }
        public string Interest { get; set; }
    }
}
