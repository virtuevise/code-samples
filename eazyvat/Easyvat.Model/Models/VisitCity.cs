using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Easyvat.Model.Models
{
    public class VisitCity
    {
        [Key]
        public int Id { get; set; }
        public string City { get; set; }  
        public int AreaId { get; set; }   
    }
}
