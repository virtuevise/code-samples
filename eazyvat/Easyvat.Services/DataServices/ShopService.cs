using Easyvat.Model.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace Easyvat.Services.DataServices
{
    public class ShopService
    {
        private readonly EasyvatContext ctx;
        public ShopService(EasyvatContext ctx)
        {
            this.ctx = ctx;

        }

        public async Task<List<Shop>> GetShops()
        {
            return await ctx.Shops.ToListAsync();
        }


        public Guid UpdateShopTable(Shop ShopData)
        {
            ctx.Shops.Add(ShopData);
            ctx.SaveChanges();
            return ShopData.Id;
        }

        //public Shop SearchShopInData(string BeitEsekName, string BeitEsekAddress)
        //{
        //    var shop = ctx.Shops.FirstOrDefault(x => x.Name == BeitEsekName && x.Address == BeitEsekAddress);

        //    return shop;

        //}

        public Shop SearchShopInData(long? NumOsek)
        {
            var shop = ctx.Shops.FirstOrDefault(x => x.RegistrationNumber == NumOsek.ToString());
            return shop;
        }


    }
}
