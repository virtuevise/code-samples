using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Easyvat.Services.DataServices;
using Easyvat.Common.Model;
using Easyvat.Model.Models;
using Microsoft.AspNetCore.Authorization;
using Easyvat.Common.Helpers;
using Easyvat.Common.Helper;
using AutoMapper;
using Easyvat.SupplierApi.Filters;
using Easyvat.SupplierApi.RealTime;
using Microsoft.AspNetCore.SignalR;


namespace Easyvat.SupplierApi.Controllers
{
    [Produces("application/json")]
    [Route("[controller]")]
    public class PurchaseController : ControllerBase
    {
        private readonly PurchaseService purchaseService;
        private readonly PassportService passportService;
        private readonly ShopService shopService;
        private readonly ItemService itemService;
        private readonly TaxesService taxesService;
        private readonly ListService listService;
        private readonly IHubContext<NotificationHub> hubContext;
        private readonly IMapper mapper;


        public PurchaseController(PurchaseService purchaseService, PassportService passportService, ShopService shopService, ItemService itemService, TaxesService taxesService, ListService listService, IMapper mapper, IHubContext<NotificationHub> hubContext)
        {
            this.purchaseService = purchaseService;
            this.passportService = passportService;
            this.shopService = shopService;
            this.itemService = itemService;
            this.taxesService = taxesService;
            this.listService = listService;
            this.hubContext = hubContext;
            this.mapper = mapper;
        }

        [HttpPost]
        [ModelStateValidation]
        public async Task<ActionResult<PurchaseResponse>> LoadPurchaseFromShop([FromBody] PurchaseDto purchaseDto)
        {

            string NumHeshbonitWithChars = purchaseDto.NumHeshbonitMaam;

            purchaseDto.NumHeshbonitMaam = new string(purchaseDto.NumHeshbonitMaam.Where(c => char.IsDigit(c)).ToArray());

            var TaxesData = await ConnectToTaxesAsync(purchaseDto);

            purchaseDto.NumHeshbonitMaam = NumHeshbonitWithChars;

            Passport PassportUpdate = new Passport();

            PassportUpdate = await UpdatePassportAsync(purchaseDto, TaxesData);

            var ShopId = SearchOrUpdateShop(purchaseDto);

            var PurchaseId = UpdatePurchase(purchaseDto, TaxesData, PassportUpdate, ShopId);

            var ItemsUpdate = UpdataItems(purchaseDto, PurchaseId);

            //await hubContext.Clients.Group(PurchaseDto.NumDarcon).SendAsync("RefreshPurchaseView");

            await hubContext.Clients.All.SendAsync("RefreshPurchaseView");

            if (TaxesData.ErrorCode != 0 || string.IsNullOrEmpty(TaxesData.OutStrPdf))
                return Ok(TaxesData);

            return Ok(TaxesData);
        }

        [HttpGet("status")]
        public IActionResult Status()
        {
            return Ok();
        }

        [Route("PurchaseSummary")]
        [HttpGet]
        public async Task<IActionResult> PurchaseSummary(Guid memberId)
        {
            var data = await purchaseService.GetNewPurchasesSummary(memberId);
            if (data.StatusCode == System.Net.HttpStatusCode.OK)
            {
                return Ok( data );
            }
            else
            {
                return Ok(new { status = 404 });
            }
        }

        [Route("PurchaseSummaryById")]
        [HttpGet]
        public async Task<IActionResult> PurchaseSummaryById(Guid purchaseId)
        {
            var data = await purchaseService.GetNewPurchasesSummaryById(purchaseId);
            if (data != null)
            {
                return Ok(new { status = 200, responseData = data });
            }
            else
            {
                return Ok(new { status = 404 });
            }
        }

        [Route("AddPurchase")]
        [HttpPost]
        public async Task<IActionResult> AddPurchase()
        {
            var data =  purchaseService.AddPurchasesData();
            return Ok(new { status = 200 });
        }
        
            [Route("getPurchaseCount")]
        [HttpGet]
        public async Task<IActionResult> getPurchaseCount(string userId)
        {
            var data = await purchaseService.GetPurchaseCountByUserId(userId);
            if (data != null)
            {
                return Ok(new { status = 200, responseData = data });
            }
            else
            {
                return Ok(new { status = 404 });
            }
        }

        [Route("resetPurchase")]
        [HttpPost]
        public async Task<IActionResult> resetPurchase([FromBody]ResetPurchaseVM model)
        {
            var data = await purchaseService.resetPurchaseById(model);
            if (data == true)
            {
                return Ok(new { status = 200 });
            }
            else
            {
                return NotFound(new { status = 404 });
            }
        }

        [Route("getPurchaseNewCount")]
        [HttpGet]
        public async Task<IActionResult> getPurchaseNewCount(string userId)
        {
            var data = await purchaseService.GetPurchaseNewCountByUserId(userId);
            if (data > 0)
            {
                return Ok(new { status = 200, responseData = data });
            }
            else
            {
                return Ok(new { status = 404 });
            }
        }

        #region [private method]
        private async Task<PurchaseResponse> ConnectToTaxesAsync(PurchaseDto PurchaseDto)
        {

            cInputData dataToTaxes = new cInputData
            {
                BeitEsekAddress = PurchaseDto.BeitEsekAddress,
                BeitEsekCity = PurchaseDto.BeitEsekCity,
                BeitEsekName = PurchaseDto.BeitEsekName,
                BeitEsekPhone = PurchaseDto.BeitEsekPhone,
                CashierName = PurchaseDto.CashierName,
                Medina = PurchaseDto.Medina,
                NumDarcon = PurchaseDto.NumDarcon,
                NumHeshbonitMaam = PurchaseDto.NumHeshbonitMaam,
                NumOsek = PurchaseDto.NumOsek,
                SoftwareIdNum = PurchaseDto.SoftwareIdNum,
                SchumHeshWithMaam = PurchaseDto.SchumHeshWithMaam,
                Pritim = PurchaseDto.Pritim
            };

            var resultTaxes = await taxesService.ConnectTaxes(dataToTaxes);

            return resultTaxes;

            //return new PurchaseResponse(); 
        }


        private async Task<Passport> UpdatePassportAsync(PurchaseDto purchaseDto, PurchaseResponse taxesData)
        {
            //todo:check for invalid data from tax service - rachel
            if (taxesData.ErrorCode < 0)
            {
                //if tax-service faill/error , what todo??
            }

            Passport passportData = new Passport
            {
                PassportNumber = purchaseDto.NumDarcon
            };

            var country = await listService.GetCountryByName(purchaseDto.Medina);

            var PassportExists = passportService.GetPassportByKeys(purchaseDto.NumDarcon, country?.ShortNameTree);  // does the passport exist in a passport table

            if (PassportExists == null)  //if the passport isn't found                
            {

                passportData.MemberId = new Guid(Constants.SystemUserId);
                passportData.PassportNumber = purchaseDto.NumDarcon;
                passportData.FirstName = "GENERAL";
                passportData.LastName = "GENERAL";
                passportData.IssueDate = DateTime.Now;
                passportData.Nationality = country?.ShortNameTree;
                passportData.ExpiredOn = DateTime.Now;

                string passportId = passportService.UpdatePassportTable(passportData);
            }

            else   //if the passport found
            {
                passportData = PassportExists;
            }

            return passportData;

        }

        private Guid UpdatePurchase(PurchaseDto PurchaseDto, PurchaseResponse TaxesData, Passport PassportUpdate, Guid ShopId)
        {
            var dataAndTime = DateTime.Now;
            Purchase purchaseData = new Purchase
            {
                DatePurchase = dataAndTime.Date,
                TimePurchase = dataAndTime.TimeOfDay,
                PassportId = PassportUpdate.Id,
                ShopId = ShopId,
                CashierName = PurchaseDto.CashierName,
                VatNumberSoftware = PurchaseDto.SoftwareIdNum,
                PurchaseAmount = Convert.ToDecimal(PurchaseDto.SchumHeshWithMaam),
                VatAmount= Convert.ToDecimal(purchaseService.calculationVatForPurch(PurchaseDto.SchumHeshWithMaam)),
                //InvoiceImage=??,
                InvoiceNumber = PurchaseDto.NumHeshbonitMaam,
                TaxesResCode = TaxesData.ErrorCode,
                TaxesResText = TaxesData.ErrorMessage,
                ReferencePdf = TaxesData.OutStrPdf,              
                IsNew = true,
                IsValid = TaxesData.ErrorCode == 0 ?true:false
            };

            Guid purchaseId = purchaseService.UpdatePurchasesTable(purchaseData);  //3a - update purchase in db
            return purchaseId;

        }




        private bool UpdataItems(PurchaseDto PurchaseDto, Guid PurchaseId)
        {

            int i;

            for (i = 0; i < PurchaseDto.Pritim.Count; i++)
            {
                Item ItemData = new Item();
                ItemData.PurchaseId = PurchaseId;
                ItemData.Description = PurchaseDto.Pritim[i].TeurParitKupa;
                ItemData.SerialNumber = PurchaseDto.Pritim[i].NumSogarKupa;//האם נכון
                ItemData.Price = PurchaseDto.Pritim[i].CostYehidaKupa;
                ItemData.Quantity = Convert.ToInt32(PurchaseDto.Pritim[i].KamutParitKniaKupa);
                ItemData.Total = PurchaseDto.Pritim[i].Cost4KamutKniaKupa;
                itemService.UpdateItemTable(ItemData);
            }

            return true;


        }


        //private async Task NewUserRegistration()
        //{

        //    Member memberData = new Member
        //    {
        //        Status = "Active",
        //        IsTourist = true,
        //        Address = "argentina",
        //        MobileNumber = "972-50-4709000",
        //        Email = "racheli1204@gmail.com"
        //    };

        //    var member = await MemberService.AddMember(memberData);

        //    Passport passportData = new Passport
        //    {
        //        MemberId = member.Id,
        //        Nationality = "argentina",
        //        PassportNumber = "AAA004599",
        //        ExpiredOn = DateTime.Now.AddYears(5),
        //        IssueDate = DateTime.Now,
        //        FirstName = "racheli",
        //        LastName = "cohen"
        //    };

        //    string PassportId = PassportService.UpdatePassportTable(passportData);

        //}



        private Guid SearchOrUpdateShop(PurchaseDto PurchaseDto)
        {
            // var Shop = shopService.SearchShopInData(PurchaseDto.BeitEsekName, PurchaseDto.BeitEsekAddress);
            var Shop = shopService.SearchShopInData(PurchaseDto.NumOsek);

            if (Shop != null)
            {
                return Shop.Id;
            }
            else
            {
                Shop shopData = new Shop
                {

                    RegistrationNumber = "GENERAL",
                    Sector = "GENERAL",
                    Name = PurchaseDto.BeitEsekName,
                    Address = PurchaseDto.BeitEsekAddress,
                    City = PurchaseDto.BeitEsekCity,
                    Country = "",
                    BranchNumber = 0,
                    VatNumberShop = PurchaseDto.SoftwareIdNum,
                    Phone = PurchaseDto.BeitEsekPhone,
                    UserName = "GENERAL",
                    Password = "GENERAL"
                };

                var ShopId = shopService.UpdateShopTable(shopData);

                return ShopId;
            }

        }
        [HttpGet("invoice/{id}")]
        public async Task<IActionResult> GetInvoiceItems(string id)
        {
            if (!Guid.TryParse(id, out Guid purchaseId))
            {
                return BadRequest();
            }

            var item = await purchaseService.GetInvoiceItems(purchaseId);

            if (item != null)
            {
                return Ok(new { status = 200, responseData = item });
            }
            else
            {
                return Ok(new { status = 404 });

            }


        }

        #endregion

    }
}