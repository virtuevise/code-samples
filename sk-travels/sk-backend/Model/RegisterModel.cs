using System.ComponentModel.DataAnnotations;

namespace sk_travel.Model
{
    public class RegisterModel
    {
        [Required(ErrorMessage = "Name is required")]
        [StringLength(100)]
        public string FirstName { get; set; }

        [Required(ErrorMessage = "Name is required")]
        [StringLength(100)]
        public string LastName { get; set; }

        [EmailAddress(ErrorMessage = "Invalid email address")]
        [Required(ErrorMessage = "Email is required")]
        public string Email { get; set; }
        public string Role { get; set; }
        [Required(ErrorMessage = "Password is required")]
        public string Password { get; set; }

        public string PhoneNumber { get; set; }
    }
}
