using System.ComponentModel.DataAnnotations;

namespace sk_travel.DAL.Tables
{
    public class Sk_Locations:BaseEntity
    {   
        [Key]
        public Guid id { get; set; }
        [Required]
        [MaxLength(100)]
        public string? Name { get; set; }
        [Required][MaxLength(10)]
        public string? Code { get; set; }
    }
}
