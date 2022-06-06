using Easyvat.Model.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace Easyvat.Services.DataServices
{
    public class ItemService
    {
        private readonly EasyvatContext ctx;

        public ItemService(EasyvatContext ctx)
        {
            this.ctx = ctx;
            
        }

        public async Task<List<Item>> GetItem()
        {
            return await ctx.Items.ToListAsync();
        }

        public void UpdateItemTable(Item ItemData)
        {
            
            try
            {
                ctx.Items.Add(ItemData);
                ctx.SaveChanges();
            }
            catch (Exception e)
            {
                throw e;
            }

        }

    }
}
