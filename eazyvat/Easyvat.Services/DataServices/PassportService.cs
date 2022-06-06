using Easyvat.Model.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace Easyvat.Services.DataServices
{
    public class PassportService
    {
        private readonly EasyvatContext ctx;

        public PassportService(EasyvatContext ctx)
        {
            this.ctx = ctx;

        }

        public async Task<Passport> GetMemberPassport(Guid? memberId)
        {
            return await ctx.Passports.Where(x=>x.MemberId == memberId)
                                      .OrderByDescending(x=>x.ExpiredOn)
                                      .FirstOrDefaultAsync();
        }

        public async Task<Passport> AddPassport(Passport passport)
        {
            ctx.Passports.Add(passport);

            await ctx.SaveChangesAsync();

            return passport;
        }

        public async Task UpdatePassport(Passport passport)
        {
            ctx.Passports.Update(passport);

            await ctx.SaveChangesAsync();
        }


        public Passport GetPassportByKeys(string passport,string nationality)
        {
            return ctx.Passports.AsNoTracking().FirstOrDefault(x => x.PassportNumber == passport && x.Nationality == nationality);
        }


        public string UpdatePassportTable(Passport passportData)
        {
            ctx.Passports.Add(passportData);

            ctx.SaveChanges();

            string passportId = passportData.Id.ToString();

            return passportId;

        }

    }
}

