using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Easyvat.Api.ViewModel
{
    public class InvoiceItemDto
    {
        public string SerialNumber { get; set; }

        public string Description { get; set; }

        public double? Price { get; set; }

        public int? Quantity { get; set; }

        public double? Total { get; set; }
    }
}
