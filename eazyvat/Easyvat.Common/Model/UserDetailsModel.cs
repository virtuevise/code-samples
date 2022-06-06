using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace Easyvat.Common.Model
{
    public class UserDetailsModel
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Nationality { get; set; }
        public string PassportNumber { get; set; }
        public DateTime BirthDate { get; set; }
        [JsonIgnore]
        public DateTime IssueDate { get; set; }
        public DateTime ExpiredOn { get; set; }
    }
}
