using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Easyvat.Model.Models
{
    public class Visit
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public Guid? MemberId { get; set; }

        //public DateTime? StartDate { get; set; }

        public DateTime? EndDate { get; set; }

        public string AreaId { get; set; }

        public string CityId { get; set; }

        public string InterestId { get; set; }

        public int? PurposeId { get; set; }
        public DateTime CreatedDateTime { get; set; } = DateTime.UtcNow;
    }
}
