using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace shoppingTouristsSqlApi
{
    public class cInputData
    {
        public long NumOsek { get; set; }
        public long NumHeshbonitMaam { get; set; }
        public string NumDarcon { get; set; }
        public string Medina { get; set; }
        public string BeitEsekName { get; set; }
        public string BeitEsekAddress { get; set; }
        public string BeitEsekCity { get; set; }
        public string BeitEsekPhone { get; set; }
        public double SchumHeshWithMaam { get; set; }
        public string CashierName { get; set; }
        public List<cParitKupaData> Pritim { get; set; }



        public cInputData()
        {

            NumOsek = 0;

            NumHeshbonitMaam = 0;

            NumDarcon = "";

            Medina = "";

            BeitEsekName = "";

            BeitEsekAddress = "";

            BeitEsekCity = "";

            BeitEsekPhone = "";

            SchumHeshWithMaam = 0;

            CashierName = "";



        }

    }
}