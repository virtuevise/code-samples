using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace Easyvat.Common.Model
{
   public class VisitInfo
    {
        public Guid? MemberId { get; set; }

        //public DateTime? StartDate { get; set; }

        public DateTime? EndDate { get; set; }
        public int[] AreaId { get; set; }     
        public int[] CityId { get; set; }
        public int[] InterestId { get; set; }     
        public int? PurposeId { get; set; }
        public DateTime CreatedDateTime { get; set; } = DateTime.UtcNow;
        public bool SpecialOffers { get; set; }
    }
}
