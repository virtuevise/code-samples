using System.ComponentModel.DataAnnotations;

namespace sk_travel.DAL.Tables
{
    public class Sk_Flight_date_Mapping: BaseEntity
    {
        [Key]
        public Guid id { get; set; }
        [Required][MaxLength(500)]
        public string? WeekDays { get; set; }
        [Required]
        public string? Flight_time { get; set; }
        [Required][MaxLength(10)]
        public string? Meridian { get; set; }

        public Guid Sk_Flight_Location_Mappingid { get; set; }
        public Sk_Flight_location_Mapping? Sk_Flight_Location_Mapping { get; set; }
    }
}
