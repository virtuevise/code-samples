using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace sk_travel.DAL.Tables
{
    public class Sk_Flight_Info_Details : BaseEntity
    {
        [Key]
        public Guid Id { get; set; }
        [Required]
        [MaxLength(50)]
        public string? Flight_code { get; set; }
        [Required]
        [MaxLength(500)]
        public string? Flight_type { get; set; }
        [Required]
        public Guid Sk_flight_infoid { get; set; }
        public virtual Sk_Flight_info? Sk_flight_info { get; set; }


    }
}
