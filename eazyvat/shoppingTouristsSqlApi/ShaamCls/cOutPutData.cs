using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace shoppingTouristsSqlApi.ShaamCls
{
    public class cOutPutData
    {

        public int rc { get; set; }
        public string rcText { get; set; }
        public string OutStrPdf { get; set; }
        public string rcExceptionText { get; set; }

        public cOutPutData()
        {
            rcText = "";
        }
    }
}