using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace Easyvat.Model.Models
{
    public class VisitPurpose
    {
        [Key]
        public int Id { get; set; }
        public string Purpose { get; set; }   //list??
    }
}
