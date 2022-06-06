using System;
using System.Collections.Generic;
using System.Text;

namespace Easyvat.Common.Model
{
    public class PurchaseSummaryReturnModel
    {
        public Guid Id { get; set; }

        public DateTime DatePurchase { get; set; }

        public TimeSpan TimePurchase { get; set; }

        public Guid? PassportId { get; set; }

        public Guid? ShopId { get; set; }

        public string InvoiceNumber { get; set; }

        public string ReferencePdf { get; set; }

        public string InvoiceImage { get; set; }

        public string CashierName { get; set; }

        public long? VatNumberSoftware { get; set; }

        public int TaxesResCode { get; set; }

        public string TaxesResText { get; set; }

        public bool IsValid { get; set; }

        public string ShopName { get; set; }

        public bool IsNew { get; set; }

        public decimal? PurchaseAmount { get; set; }

        public decimal?  VatAmount { get; set; }

        public string ShopAdress { get; set; }

        public string Logo { get; set; }

    }
}
