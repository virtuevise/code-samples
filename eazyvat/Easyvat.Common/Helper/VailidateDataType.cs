using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Easyvat.Common.Helper
{
    public class VailidateDataType:ValidationAttribute
    {
        public override bool IsValid(object value)
        {
            string data = value.ToString();
            if (data.Contains("."))
            {
                return false;
            }
            else
            {
                return true;
            }
        }
    }
}
