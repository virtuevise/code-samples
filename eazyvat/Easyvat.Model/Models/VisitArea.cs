using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Easyvat.Model.Models
{
    public class VisitArea
    {
        [Key]
        public int Id { get; set; }
        public string Area { get; set; }   //list??
    }
}
