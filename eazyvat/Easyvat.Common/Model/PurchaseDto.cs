using System;
using System.Collections.Generic;
using Easyvat.Common.Resources;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Easyvat.Common.Helper;
using Easyvat.Common.Model;

namespace Easyvat.Common.Model
{
    public class PurchaseDto
    {
        [Required(ErrorMessageResourceType = typeof(ValidationErrorCode), ErrorMessageResourceName = "_401")]
        [Range(1, 999999999, ErrorMessageResourceType = typeof(ValidationErrorCode), ErrorMessageResourceName = "_402")]
        public long? NumOsek { get; set; }

        [Required(ErrorMessageResourceType = typeof(ValidationErrorCode), ErrorMessageResourceName = "_403")]
        //[Range(1, 9999999999, ErrorMessageResourceType = typeof(ValidationErrorCode), ErrorMessageResourceName ="_404")]
        //public long? NumHeshbonitMaam { get; set; }
        public string NumHeshbonitMaam { get; set; }

        [Required(ErrorMessageResourceType = typeof(ValidationErrorCode), ErrorMessageResourceName = "_397")]
        [StringLength(9, ErrorMessageResourceType = typeof(ValidationErrorCode), ErrorMessageResourceName = "_398")]
        [RegularExpression(RegExpHelper.PassportNumber, ErrorMessageResourceType = typeof(ValidationErrorCode), ErrorMessageResourceName = "_398")]  //כמה ספרות במס דרכון 9 או 12
        public string NumDarcon { get; set; }


        [Required(ErrorMessageResourceType = typeof(ValidationErrorCode), ErrorMessageResourceName = "_399")]
        [StringLength(50, ErrorMessageResourceType = typeof(ValidationErrorCode), ErrorMessageResourceName = "_400")]
        [RegularExpression(RegExpHelper.Medina, ErrorMessageResourceType = typeof(ValidationErrorCode), ErrorMessageResourceName = "_400")]
        public string Medina { get; set; }

        [Required(ErrorMessageResourceType = typeof(ValidationErrorCode), ErrorMessageResourceName = "_420")]
        [StringLength(22, ErrorMessageResourceType = typeof(ValidationErrorCode), ErrorMessageResourceName = "_421")]
        [RegularExpression(RegExpHelper.BeitEsekName, ErrorMessageResourceType = typeof(ValidationErrorCode), ErrorMessageResourceName = "_421")]
        public string BeitEsekName { get; set; }

        [Required(ErrorMessageResourceType = typeof(ValidationErrorCode), ErrorMessageResourceName = "_422")]
        [StringLength(30, ErrorMessageResourceType = typeof(ValidationErrorCode), ErrorMessageResourceName = "_423")]
        [RegularExpression(RegExpHelper.BeitEsekAddress, ErrorMessageResourceType = typeof(ValidationErrorCode), ErrorMessageResourceName = "_423")]
        public string BeitEsekAddress { get; set; }

        [Required(ErrorMessageResourceType = typeof(ValidationErrorCode), ErrorMessageResourceName = "_424")]
        [StringLength(20, ErrorMessageResourceType = typeof(ValidationErrorCode), ErrorMessageResourceName = "_425")]
        [RegularExpression(RegExpHelper.BeitEsekCity, ErrorMessageResourceType = typeof(ValidationErrorCode), ErrorMessageResourceName = "_425")]
        public string BeitEsekCity { get; set; }

        [Required(ErrorMessageResourceType = typeof(ValidationErrorCode), ErrorMessageResourceName = "_426")]
        [StringLength(15, ErrorMessageResourceType = typeof(ValidationErrorCode), ErrorMessageResourceName = "_427")]
        [RegularExpression(RegExpHelper.BeitEsekPhone, ErrorMessageResourceType = typeof(ValidationErrorCode), ErrorMessageResourceName = "_427")]
        public string BeitEsekPhone { get; set; }


        [Required(ErrorMessageResourceType = typeof(ValidationErrorCode), ErrorMessageResourceName = "_406")]
        //[SumProductsValidtion( ErrorMessageResourceType = typeof(ValidationErrorCode), ErrorMessageResourceName = "_10031")]
        public double? SchumHeshWithMaam { get; set; }


        [Required(ErrorMessageResourceType = typeof(ValidationErrorCode), ErrorMessageResourceName = "_428")]
        [StringLength(50, ErrorMessageResourceType = typeof(ValidationErrorCode), ErrorMessageResourceName = "_429")]
        [RegularExpression(RegExpHelper.CashierName, ErrorMessageResourceType = typeof(ValidationErrorCode), ErrorMessageResourceName = "_429")]
        public string CashierName { get; set; }


        [Required(ErrorMessageResourceType = typeof(ValidationErrorCode), ErrorMessageResourceName = "_500")]
        [Range(1, 999999999, ErrorMessageResourceType = typeof(ValidationErrorCode), ErrorMessageResourceName = "_501")]
        public long? SoftwareIdNum { get; set; }


        [Required(ErrorMessageResourceType = typeof(ValidationErrorCode), ErrorMessageResourceName = "_432")]
        // [SumProductsValidtion(ErrorMessageResourceType = typeof(ValidationErrorCode), ErrorMessageResourceName = "_10031")]
        public List<cParitKupaData> Pritim { get; set; }
    }

}
