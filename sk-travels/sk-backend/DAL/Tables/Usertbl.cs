using Microsoft.AspNetCore.Identity;

namespace sk_travel.DAL.Tables
{
    public class UserTbl: IdentityUser
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
    }
}
