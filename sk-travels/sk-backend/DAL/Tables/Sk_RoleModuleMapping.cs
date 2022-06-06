using System.ComponentModel.DataAnnotations;

namespace sk_travel.DAL.Tables
{
    public class Sk_RoleModuleMapping: BaseEntity
    {
        [Key]
        public Guid id { get; set; }
        public Guid RoleId { get; set; }
        public Guid Sk_VeiwModuleTblid { get; set; }
        public virtual Sk_VeiwModuleTbl? Sk_VeiwModuleTbl { get; set; }
    }
}
