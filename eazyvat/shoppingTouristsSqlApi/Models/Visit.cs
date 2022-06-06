using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace shoppingTouristsSqlApi.Models
{
    public class Visit
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid VisitID { get; set; }

        public string PasspotrId { get; set; }

        public string UserId { get; set; }

        public string Purpose { get; set; }  //list?

        public DateTime EntryDate { get; set; }

        public DateTime ExitDate { get; set; }

        public string Area { get; set; }

        public string cities { get; set; }

        //public float SumPurchases { get; set; }

        //public float vatRefundEntitled { get; set; }

        //public float vatRefundPaid { get; set; }

        //public float sumCommision { get; set; }




    }
}