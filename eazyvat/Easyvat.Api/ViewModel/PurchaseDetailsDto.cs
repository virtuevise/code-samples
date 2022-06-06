using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Easyvat.Api.ViewModel
{
    public class PurchaseDetailsDto
    {
        public Guid? Id { get; set; }
        public DateTime DatePurchase { get; set; }

        public string ShopName { get; set; }

        /// <summary>
        /// address + city = full
        /// </summary>
        public string FullShopAddress { get; set; }

        public string Sum { get; set; }

        public string VatReclaim { get; set; }

        public string InvoiceNumber { get; set; }

        public string InvoiceImage { get; set; }

        public bool IsValid { get; set; }

    }
}
