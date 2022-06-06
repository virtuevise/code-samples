using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Easyvat.Model.Models
{
    public class Item
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        public Guid? PurchaseId { get; set; }

        public string SerialNumber { get; set; }

        public string Description { get; set; }

        public double? Price { get; set; }

        public int? Quantity { get; set; }

        public double? Total { get; set; }

        [ForeignKey(nameof(PurchaseId))]
        public virtual Purchase Purchase { get; set; }

    }
}
