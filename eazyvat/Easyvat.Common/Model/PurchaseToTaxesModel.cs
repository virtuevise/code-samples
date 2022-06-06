using Easyvat.Common.Helper;
using Easyvat.Common.Resources;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Easyvat.Common.Model
{
   public class PurchaseToTaxesModel
    {
    }
    public class cParitKupaData2
    {

        [Required(ErrorMessageResourceType = typeof(ValidationErrorCode), ErrorMessageResourceName = "_409")]
        [StringLength(100, ErrorMessageResourceType = typeof(ValidationErrorCode), ErrorMessageResourceName = "_414")]
        [RegularExpression(RegExpHelper.TeurParitKupa, ErrorMessageResourceType = typeof(ValidationErrorCode), ErrorMessageResourceName = "_414")]
        public string TeurParitKupa { get; set; }

        [Required(ErrorMessageResourceType = typeof(ValidationErrorCode), ErrorMessageResourceName = "_416")]
        [StringLength(18, ErrorMessageResourceType = typeof(ValidationErrorCode), ErrorMessageResourceName = "_417")]
        [RegularExpression(RegExpHelper.NumSogarKupa, ErrorMessageResourceType = typeof(ValidationErrorCode), ErrorMessageResourceName = "_417")]
        public string NumSogarKupa { get; set; }

        [Required(ErrorMessageResourceType = typeof(ValidationErrorCode), ErrorMessageResourceName = "_410")]
        public double? CostYehidaKupa { get; set; }

        [Required(ErrorMessageResourceType = typeof(ValidationErrorCode), ErrorMessageResourceName = "_412")]
        [VailidateDataType(ErrorMessageResourceType = typeof(ValidationErrorCode), ErrorMessageResourceName = "_432")]
        public int? KamutParitKniaKupa { get; set; }

        [Required(ErrorMessageResourceType = typeof(ValidationErrorCode), ErrorMessageResourceName = "_503")]
        public double? Cost4KamutKniaKupa { get; set; }
    }

    public class cInputData2
    {
        public long? NumOsek { get; set; }
        public string NumHeshbonitMaam { get; set; }
        public string NumDarcon { get; set; }
        public string Medina { get; set; }
        public string BeitEsekName { get; set; }
        public string BeitEsekAddress { get; set; }
        public string BeitEsekCity { get; set; }
        public string BeitEsekPhone { get; set; }
        public double? SchumHeshWithMaam { get; set; }
        public string CashierName { get; set; }
        public long? SoftwareIdNum { get; set; }
        public List<cParitKupaData2> Pritim { get; set; }


    }
}
