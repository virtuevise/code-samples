using System.ComponentModel.DataAnnotations;

namespace sk_travel.DAL.Tables
{
    public class Sk_Flight_info : BaseEntity
    {
        [Key]
        public Guid id { get; set; }
        [Required][MaxLength(100)]
        public string? Flight_name { get; set; }

        public  ICollection<Sk_Flight_Info_Details>? Sk_Fligth_Info_Details { get; set; }
    }
}
