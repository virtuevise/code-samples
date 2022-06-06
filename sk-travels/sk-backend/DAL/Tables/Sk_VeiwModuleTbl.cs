using System.ComponentModel.DataAnnotations;

namespace sk_travel.DAL.Tables
{
    public class Sk_VeiwModuleTbl: BaseEntity
    {
        [Key]
        public Guid id { get; set; }
        public string? ModuleName { get; set; }
        public string? DisplayName { get; set; }
    }
}
