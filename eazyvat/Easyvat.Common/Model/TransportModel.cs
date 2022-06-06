using System;
using System.Collections.Generic;
using System.Text;
using System.Xml.Serialization;

namespace Easyvat.Common.Model
{
   
    public class AppResponse
    {
        public string ClientMessage { get; set; }
        public string ErrorMessage { get; set; }
        public string Title { get; set; }
    }

    

}
