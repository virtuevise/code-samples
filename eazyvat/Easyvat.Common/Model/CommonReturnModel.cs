using System;
using System.Collections.Generic;
using System.Net;
using System.Text;

namespace Easyvat.Common.Model
{
    public class CommonReturnModel
    {
        public HttpStatusCode StatusCode { get; set; }
        public string Message { get; set; }
        public dynamic ResponseData { get; set; }
    }
}
