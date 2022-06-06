using System;
using System.Collections.Generic;
using System.Text;
using System.Text.RegularExpressions;

namespace Easyvat.Common.Helper
{
    public class RegExpHelper
    {
        public const string PassportNumber = @"^[a-zA-Z0-9]*${0,9}";
        public const string Medina = "[א-תA-Za-z0-9 ]{0,50}";
        public const string BeitEsekName = @"[א-תA-Za-z0-9 \- _'` ,\." + "\"" + @" \( \) \[ \] \\ / &#$!@:;\*\+]{0,22}";
        public const string BeitEsekAddress = @"[א-תA-Za-z0-9 \- _'` ,\." + "\"" + @" \( \) \[ \] \\ / &#$!@:;\*\+]{0,30}";
        public const string BeitEsekCity = @"[א-תA-Za-z0-9 \-" + "\"" + @"]{0,20}";
        public const string BeitEsekPhone = @"^[0-9 \-]*${0,15}";
        public const string CashierName= @"[א-תA-Za-z0-9 \- _'` ,\." + "\"" + @" \( \) \[ \] \\ / &#$!@:;\*\+]{0,50}";
        public const string TeurParitKupa= @"[א-תA-Za-z0-9 \- _'` ,\." + "\"" + @" \( \) \[ \] \\ / &#$!@:;\*\+]{0,100}";
        public const string NumSogarKupa = @"^[a-zA-Z0-9]*${0,18}";

        

        public static bool IsMatch(string input, string pattern)
        {
            var regExpChar = new Regex(pattern);
            var v = regExpChar.Match(input);
           return v.Captures[0].Value == input;
            
        }

     
    }
}
