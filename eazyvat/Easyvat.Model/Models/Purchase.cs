using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Easyvat.Model.Models
{
    public class Purchase
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        public DateTime DatePurchase { get; set; }

        public TimeSpan TimePurchase { get; set; }

        public Guid? PassportId { get; set; }

        public Guid? ShopId { get; set; }
   
        public string InvoiceNumber { get; set; }

        [MaxLength]
        public string ReferencePdf { get; set; }

        public string InvoiceImage { get; set; }

        public string CashierName { get; set; }

        public long? VatNumberSoftware { get; set; }

        public int TaxesResCode { get; set; }  

        public string TaxesResText { get; set;}

        public bool IsValid { get; set; }

        public bool IsNew { get; set; }

        public decimal? PurchaseAmount { get; set; }

        public decimal? VatAmount { get; set; }

        [ForeignKey(nameof(PassportId))]
        public virtual Passport Passport { get; set; }

        [ForeignKey(nameof(ShopId))]
        public virtual Shop Shop { get; set; }  // Remove after getting DB script

        public virtual List<Item> Items { get; set; }  // Remove after getting DB script

    }
}
