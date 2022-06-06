using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Easyvat.Api.ViewModel
{
    public class CurrentPurchaseDto
    {
        public Guid? Id { get; set; }
        public DateTime DatePurchase { get; set; }
        public string ShopName { get; set; }
        public string Total { get; set; }
        public string Refund { get; set; }
        public bool IsValid { get; set; }
    }
}
