using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Easyvat.Common.Model
{
    public class SaveCardModel
    {
        [Required]
        public string UserId { get; set; }
        [Required]
        public string CardNumber { get; set; }
        [Required]
        public string CVV { get; set; }
        [Required]
        public string ExpiryMonth { get; set; }
        [Required]
        public string ExpiryYear { get; set; }
    }
}
