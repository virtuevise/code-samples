using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Easyvat.Api.ViewModel
{
    public class VisitDto
    {
        //public DateTime StartDate { get; set; }
        public Guid? MemberId { get; set; }

        public DateTime? EndDate { get; set; }

        public int[] AreaId { get; set; }

        public int[] CityId { get; set; }

        public int[] InterestId { get; set; }

        public int? PurposeId { get; set; }
        public bool SpecialOffers { get; set; }
    }
}
