using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Easyvat.Model.Models
{
    public class Country
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        [MaxLength(3)]
        [Required]
        public string ShortNameTree { get; set; }

        [Required]
        public string Code { get; set; }

        [MaxLength(2)]
        [Required]
        public string ShortNameTwo { get; set; }

        [Required]
        public string EnglishName { get; set; }

        [Required]
        public string HebrewName { get; set; }

    }
}
