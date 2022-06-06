using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace shoppingTouristsSqlApi.ShaamCls
{
    public class cParitKupaData
    {
        public string TeurParitKupa { get; set; }
        public string NumSogarKupa { get; set; }
        public double CostYehidaKupa { get; set; }
        public int KamutParitKniaKupa { get; set; }
        public double Cost4KamutKniaKupa { get; set; }


        public cParitKupaData()
        {
            TeurParitKupa = "";
            NumSogarKupa = "";
        }



    }
}