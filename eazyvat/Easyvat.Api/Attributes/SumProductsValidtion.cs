using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using Easyvat.Common.Model;

namespace Easyvat.Api.attributes
{
    public class SumProductsValidtion : ValidationAttribute
    {
        private readonly double? _AmountProducts;

        public SumProductsValidtion()
        {
            _AmountProducts = 0;
   
           

        }

        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
          
            double valOfUser = Convert.ToInt32(value);
            if (valOfUser != _AmountProducts)
                return new ValidationResult(ErrorMessageResourceName);
            return ValidationResult.Success;
        }
    }
}
