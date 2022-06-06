using Easyvat.Model.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Easyvat.Common.Model;

namespace Easyvat.Services.DataServices
{
    public class PurchaseService
    {

        private readonly EasyvatContext ctx;

        public PurchaseService(EasyvatContext ctx)
        {
            this.ctx = ctx;
        }

        public async Task<Purchase> GetSinglePurchase(Guid? id)
        {
            //return await ctx.Purchases.Include(s => s.Shop).Include(i => i.Items)
            //                          .SingleOrDefaultAsync(x => x.Id == id);
            return await ctx.Purchases.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<List<Item>> GetInvoiceItems(Guid? id)
        {
            // return await ctx.Purchases.Include(i => i.Items)
            //                          .SingleOrDefaultAsync(x => x.Id == id);
            // return await ctx.Items.FirstOrDefaultAsync(x => x.PurchaseId.Equals(id));
            var result = ctx.Items.Where(x => x.PurchaseId == id).ToList();
            return result;
        }

        public async Task<List<Purchase>> GetPurchasesSummary(Guid? memberId)
        {

            var result = await ctx.Purchases.Where(x => x.Passport.MemberId == memberId)
                                .Include(i => i.Items)
                                .Include(s => s.Shop)
                                .OrderByDescending(x => x.DatePurchase)
                                .ToListAsync();
            return result;
        }

        public async Task UpdateMemberPurchases(Passport passport)
        {
            var purchases = await ctx.Purchases.Include(p => p.Passport)
                                        .Where(x => x.Passport.PassportNumber == passport.PassportNumber)
                                        .ToListAsync();

            purchases.ForEach(x => x.PassportId = passport.Id);

        }



        public Guid UpdatePurchasesTable(Purchase PurchaseDto)
        {
            ctx.Purchases.Add(PurchaseDto);

            ctx.SaveChanges();

            Guid purchaseId = PurchaseDto.Id;

            return purchaseId;

        }

        public async Task<Purchase> GetPurchase(Guid? id)
        {
            return await ctx.Purchases.FindAsync(id);
        }


        public async Task<CommonReturnModel> GetNewPurchasesSummary(Guid? memberId)
        {
            CommonReturnModel response = new CommonReturnModel();
            try
            {               
               var result = await (from pr in ctx.Purchases
                          where pr.PassportId.ToString() == memberId.ToString()
                          orderby pr.DatePurchase descending
                         select new 
                          {
                              Id = pr.Id,
                              CashierName = pr.CashierName,
                              DatePurchase = pr.DatePurchase,
                              InvoiceImage = pr.InvoiceImage,
                              InvoiceNumber = pr.InvoiceNumber,
                              IsValid = pr.IsValid,
                              PassportId = pr.PassportId,
                              ReferencePdf = pr.ReferencePdf,
                              TaxesResCode = pr.TaxesResCode,
                              TaxesResText = pr.TaxesResText,
                              TimePurchase = pr.TimePurchase,
                              VatNumberSoftware = pr.VatNumberSoftware,
                              ShopDetails = ctx.Shops.Where(s => s.Id == pr.ShopId).Select(s=> new {s.Id,s.Name,s.Logo}).FirstOrDefault(),
                              IsNew = pr.IsNew,
                              PurchaseAmount=pr.PurchaseAmount,
                              VatAmount=pr.VatAmount,
                          }).ToListAsync();
                if (result.Count >0)
                {
                    response.ResponseData = result;
                    response.Message = "Successfully fetched";
                    response.StatusCode = System.Net.HttpStatusCode.OK;
                    
                }
                else
                {
                    response.StatusCode = System.Net.HttpStatusCode.BadRequest;
                    response.Message = "null";
                }
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                response.StatusCode = System.Net.HttpStatusCode.InternalServerError;
            }
            return response;

        }

        public async Task<PurchaseSummaryReturnModel> GetNewPurchasesSummaryById(Guid id)
        {
            PurchaseSummaryReturnModel result = new PurchaseSummaryReturnModel();
            try
            {
                
                //var purchaseData = ctx.Purchases.FirstOrDefault(x => x.Id == id);
                //if (purchaseData != null)
                //{
                //    purchaseData.IsNew = false;
                //    ctx.Purchases.Update(purchaseData);
                //    ctx.SaveChanges();
                //}
                result = await (from pr in ctx.Purchases
                          join sp in ctx.Shops
                          on pr.ShopId equals sp.Id
                          where pr.Id == id
                          select new PurchaseSummaryReturnModel
                          {
                              Id = pr.Id,
                              ShopId = sp.Id,
                              CashierName = pr.CashierName,
                              DatePurchase = pr.DatePurchase,
                              InvoiceImage = pr.InvoiceImage,
                              InvoiceNumber = pr.InvoiceNumber,
                              IsValid = pr.IsValid,
                              PassportId = pr.PassportId,
                              ReferencePdf = pr.ReferencePdf,
                              TaxesResCode = pr.TaxesResCode,
                              TaxesResText = pr.TaxesResText,
                              TimePurchase = pr.TimePurchase,
                              VatNumberSoftware = pr.VatNumberSoftware,
                              PurchaseAmount = pr.PurchaseAmount,
                              VatAmount=pr.VatAmount,
                              ShopName = sp.Name,
                              ShopAdress = sp.Address + ", " + sp.City + ", " + sp.Country,
                              IsNew = pr.IsNew
                          }).FirstOrDefaultAsync();
            }
            catch (Exception ex)
            {

            }
            return result;

        }

        public Guid AddPurchasesData()
        {
            DateTime dateTime = DateTime.Now;
            DateTime dateBefore = DateTime.Now.AddHours(-2);
            TimeSpan timeSpan = dateTime - dateBefore;
            Purchase purchase = new Purchase
            {
                DatePurchase = DateTime.UtcNow,
                TimePurchase = timeSpan,
                PassportId = Guid.Parse("910FD9F1-1B66-4650-A229-08D8DC218ABA"),
                ShopId = Guid.NewGuid(),
                InvoiceImage = null,
                ReferencePdf = null,
                CashierName = "Zara shopkeeper",
                VatNumberSoftware = 1,
                TaxesResCode = 11,
                TaxesResText = null,
                IsValid = true,
                IsNew = true
            };
            ctx.Purchases.Add(purchase);

            ctx.SaveChanges();

            Guid purchaseId = purchase.Id;

            return purchaseId;

        }

    
        public async Task<int> GetPurchaseCountByUserId(string userId)  //how purchases to user
        {
            int purchaseCount = ctx.Purchases.Where(x => x.PassportId == Guid.Parse(userId)).Count();
            return purchaseCount;

        }

        public async Task<int> GetPurchaseNewCountByUserId(string userId)   //how purchases new to user
        {
            int purchaseCount = ctx.Purchases.Where(x => x.PassportId == Guid.Parse(userId) && x.IsNew == true).Count();
            return purchaseCount;

        }

        public double? calculationVatForPurch(double? SchumHeshWithMaam)
        {
            double? VatAmount = SchumHeshWithMaam-(SchumHeshWithMaam/1.17);
            return VatAmount;
        }

        public async Task<bool> resetPurchaseById(ResetPurchaseVM model)
        {
            var data = await ctx.Purchases.FirstOrDefaultAsync(a => a.PassportId == new Guid(model.userId) && a.Id == new Guid(model.purchaseId));
            if (data != null)
            {
                data.IsNew = false;
                ctx.Purchases.Update(data);
                ctx.SaveChanges();
                return true;
            }
            else
            {
                return false;

            }
        }
    }
}
