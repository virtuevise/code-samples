using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace sk_travel.DAL.Tables
{
    public class Sk_Flight_location_Mapping : BaseEntity
    {
        [Key]
        public Guid id { get; set; }
        [Required]
        public Guid Location_from_id { get; set; }
        [Required][MaxLength(10)]
        public string? Location_from_code { get; set; }
        [Required]
        public Guid Location_to_id { get; set; }
        [Required][MaxLength(10)]
        public string? Location_to_code { get; set; }

        [Required][MaxLength(100)]
        public string? Fligth_class { get; set; }
        [Required]
        [MaxLength(10)]
        public string? ValidTill_date { get; set; }
        [Required]
        [MaxLength(10)]
        public string? ValidTill_time { get; set; }
        [Required]
        public Guid SupplierId { get; set; }
        [Required]
        public int Total_seat { get; set; }
        [Required]
        public int Available_seat { get; set; }
        [Required]
        public bool RealTime_booking { get; set; }
        [Required]
        public string? Pnr_no { get; set; }
        [Required]
        [MaxLength(10)]
        public string? Departure_time { get; set; }
        [Required]
        [MaxLength(10)]
        public string? Arrival_time { get; set; }

        public Guid Sk_Flight_Info_Detailsid { get; set; }
        public virtual Sk_Flight_Info_Details? Sk_Flight_Info_Details { get; set; }
    }
}
