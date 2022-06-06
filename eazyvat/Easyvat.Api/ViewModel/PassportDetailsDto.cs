using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Easyvat.Api.ViewModel
{
    public class PassportDetailsDto
    {
        [JsonIgnore]
        public Guid Id { get; set; }
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Nationality { get; set; }

        public string PassportNumber { get; set; }

        public DateTime ExpiredOn { get; set; }

        public DateTime BirthDate { get; set; }
        [JsonIgnore]
        public string ImagePassport { get; set; }
        [JsonIgnore]
        public string ImageMember { get; set; }
    }
}
