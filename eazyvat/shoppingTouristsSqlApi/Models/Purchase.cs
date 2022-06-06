using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace shoppingTouristsSqlApi.Models
{
    public class Purchase
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid PurchaseId { get; set; }

        public DateTime Date { get; set; }

        public TimeSpan Time { get; set; }

        public int VisitId { get; set; }
                                          //האם תקין int
        public int ShopId { get; set; }

        public string ItemNumber { get; set; }

        public string Description { get; set; }

        public int Amount { get; set; }

        public float Price { get; set; }

        public float Vat { get; set; }

        public string InvoiceNumber { get; set; }

        public string ReferencePdf { get; set; }

        public string InvoiceImage { get; set; }  //??

        //public float Commission { get; set; }

        //public float VatAfterCommission { get; set; }//סכום מעמ אחרי עמלה

        //public float VatPercent { get; set; }//שיעור מעמ

        //public float SumVat { get; set; }//סכום מעמ

        //public int InvoiceStatus { get; set; }//מצב חשבונית

        //public int ReasonStatusCode { get; set; }//קוד מצב סיבה





    }
}