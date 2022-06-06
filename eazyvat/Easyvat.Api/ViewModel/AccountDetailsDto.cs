using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Easyvat.Api.ViewModel
{
    public class AccountDetailsDto
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Nationality { get; set; }

        public string PassportNumber { get; set; }

        public DateTime ExpiredOn { get; set; }

        public DateTime BirthDate { get; set; }

        public string MobileNumber { get; set; }

        public string Email { get; set; }

        public string ImageMember { get; set; }

        public string ImagePassport { get; set; }

    }
}
