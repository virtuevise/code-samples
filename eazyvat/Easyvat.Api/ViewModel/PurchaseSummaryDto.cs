using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Easyvat.Api.ViewModel
{
    public class PurchaseSummaryDto
    {
        public string Total { get; set; }
        public string VatReclaim { get; set; }
    }
}
