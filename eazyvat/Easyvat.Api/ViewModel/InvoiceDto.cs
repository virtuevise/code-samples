using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Easyvat.Api.ViewModel
{
    public class InvoiceDto
    {
        public long? InvoiceNumber { get; set; }

        public List<InvoiceItemDto> Items { get; set; }
    }
}
