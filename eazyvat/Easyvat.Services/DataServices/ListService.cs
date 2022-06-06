using Easyvat.Model.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Easyvat.Services.DataServices
{
    public class ListService
    {
        private readonly EasyvatContext ctx;

        public ListService(EasyvatContext ctx)
        {
            this.ctx = ctx;
        }

        public async Task<List<Country>> GetCountries()
        {
            return await ctx.Countries.ToListAsync();
        }
    
        public async Task<Country> GetCountryByName(string searchStr)
        {
            return await ctx.Countries.SingleAsync(x=>x.HebrewName == searchStr || x.EnglishName == searchStr);
        }
    }
}
