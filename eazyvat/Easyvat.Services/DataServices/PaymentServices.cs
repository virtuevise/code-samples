using Easyvat.Common.Model;
using Easyvat.Model.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Easyvat.Services.DataServices
{
    public class PaymentServices
    {
        private readonly EasyvatContext ctx;

        public PaymentServices(EasyvatContext ctx)
        {
            this.ctx = ctx;
        }

        public async Task<List<SavedCards>> GetSavedCards(string userId)
        {
            return await ctx.Creditcards.Where(x => x.PassportId == userId && x.IsActive == true && x.IsDeleted == false).ToListAsync();
        }

        public async Task<string> SaveCard(SaveCardModel cardModel)
        {
            try
            {
                var exist = await ctx.Creditcards.FirstOrDefaultAsync(x => x.PassportId == cardModel.UserId && x.CardNumber == cardModel.CardNumber);
                if (exist == null)
                {
                    SavedCards savedCards = new SavedCards
                    {
                        CardNumber = cardModel.CardNumber,
                        CVV = cardModel.CVV,
                        ExpiryMonth = cardModel.ExpiryMonth,
                        ExpiryYear = cardModel.ExpiryYear,
                        IsActive = true,
                        IsDeleted = false,
                        PassportId = cardModel.UserId
                    };
                    ctx.Creditcards.Add(savedCards);
                }
                else
                {
                    exist.CardNumber = cardModel.CardNumber;
                    exist.CVV = cardModel.CVV;
                    exist.ExpiryMonth = cardModel.ExpiryMonth;
                    exist.ExpiryYear = cardModel.ExpiryYear;
                    exist.IsActive = true;
                    exist.IsDeleted = false;
                    ctx.Creditcards.Update(exist);
                }
                await ctx.SaveChangesAsync();
                var userData = ctx.Passports.FirstOrDefault(x => x.Id.ToString() == cardModel.UserId);
                string userName = userData.FirstName + " " + userData.LastName;
                return userName;
            }
            catch (Exception)
            {
                return "";
            }
        }


        public async Task<bool> DeleteCard(SaveCardModel cardModel)
        {
            try
            {
                var exist = await ctx.Creditcards.FirstOrDefaultAsync(x => x.PassportId == cardModel.UserId && x.CardNumber == cardModel.CardNumber);
                if (exist != null)
                {
                    ctx.Creditcards.Remove(exist);
                    ctx.SaveChanges();
                    return true;
                }
                else
                    return false;

            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}
