using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Easyvat.Services.DataServices;
using Easyvat.Api.ViewModel;
using Easyvat.Api.Filters;
using Easyvat.Common.Model;
using Easyvat.Model.Models;
using Microsoft.AspNetCore.Authorization;
using Easyvat.Common.Helpers;
using Easyvat.Common.Helper;
using AutoMapper;
using Microsoft.AspNetCore.SignalR;
using Easyvat.Api.RealTime;

namespace Easyvat.Api.Controllers
{
    [Produces("application/json")]
    [Route("[controller]")]
    public class PurchaseController : ControllerBase
    {
        private readonly PurchaseService PurchaseService;
        private readonly PassportService PassportService;
        private readonly ShopService ShopService;
        private readonly MemberService MemberService;
        private readonly ItemService ItemService;
        private readonly TaxesService TaxesService;
        private readonly IMapper Mapper;
        private readonly IHubContext<NotificationHub> hubContext;


        public PurchaseController(PurchaseService PurchaseService, PassportService PassportService, ShopService ShopService, MemberService MemberService, ItemService ItemService, TaxesService TaxesService, IMapper Mapper, IHubContext<NotificationHub> hubContext)
        {
            this.PurchaseService = PurchaseService;
            this.PassportService = PassportService;
            this.ShopService = ShopService;
            this.MemberService = MemberService;
            this.ItemService = ItemService;
            this.TaxesService = TaxesService;
            this.Mapper = Mapper;
            this.hubContext = hubContext;
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<PurchaseDetailsDto>> GetPurchaseById(string id)
        {
            if (!Guid.TryParse(id, out Guid purchaseId))
            {
                return BadRequest();
            }

            var purchase = await PurchaseService.GetSinglePurchase(purchaseId);
            var result = Mapper.Map<PurchaseDetailsDto>(purchase);
            return Ok(result);

        }

        [HttpGet("member")]
        [Authorize]
        public async Task<ActionResult<PurchaseSummaryDto>> GetPurchasesSummary()
        {
            var memberId = new Guid(User.ClaimValue(ClaimHelper.ClaimId));

            var purchases = await PurchaseService.GetPurchasesSummary(memberId);

            var result = CalculatePurchaseSummary(purchases);

            return Ok(result);

        }

        [HttpGet("current")]
        [Authorize]
        public async Task<ActionResult> GetCurrentPurchases()
        {
            var memberId = new Guid(User.ClaimValue(ClaimHelper.ClaimId));

            var purchasesList = await PurchaseService.GetPurchasesSummary(memberId);

            var summary = CalculatePurchaseSummary(purchasesList);

            var purchases = Mapper.Map<List<CurrentPurchaseDto>>(purchasesList);

            var result = new { Purchases = purchases, Summary = summary };

            return Ok(result);

        }

        [HttpGet("invoice/{id}")]
        [Authorize]
        public async Task<ActionResult<InvoiceDto>> GetInvoiceItems(string id)
        {
            if (!Guid.TryParse(id, out Guid purchaseId))
            {
                return BadRequest();
            }

            var purchase = await PurchaseService.GetInvoiceItems(purchaseId);

            var result = Mapper.Map<InvoiceDto>(purchase);

            return Ok(result);
        }


        #region [private method]
        private static PurchaseSummaryDto CalculatePurchaseSummary(List<Purchase> purchases)
        {
            var Total = purchases.SelectMany(x => x.Items).Sum(x => x.Total);

            var TotalReclaim = purchases.Where(x => x.IsValid).SelectMany(x => x.Items).Sum(x => x.Total);

            //var VatReclaim = TotalReclaim == null ? null : TotalReclaim * Constants.VatPercentage;
            var VatReclaim = TotalReclaim == null ? null : TotalReclaim - TotalReclaim /(1 + Constants.VatPercentage);

            var purchaseSummary = new PurchaseSummaryDto()
            {
                Total = Total != null ? Total.Value.ToString("#.00") : "0",
                VatReclaim = VatReclaim != null ? VatReclaim.Value.ToString("#.00") : "0"
            };

            return purchaseSummary;
        }

        #endregion

    }
}