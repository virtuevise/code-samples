using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Easyvat.Model.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Easyvat.Api.Controllers
{
    [Produces("application/json")]
    [Route("[controller]")]
    public class DbConfigController : ControllerBase
    {
        private readonly EasyvatContext db;

        public DbConfigController(EasyvatContext db)
        {
            this.db = db;
        }

        [HttpGet("status")]
        public IActionResult Status()
        {
            return Ok();
        }

        [HttpGet("status-db")]
        public IActionResult StatusDB()
        {
            var res = db.Members.FirstOrDefault();

            return Ok(res);
        }

        //[HttpPost]
        //public async Task<IActionResult> CreateDbSchema()
        //{
        //    try
        //    {
        //        await db.Database.EnsureDeletedAsync();
        //        await db.Database.EnsureCreatedAsync();

        //        db.Members.Add(new Member()
        //        {
        //            Id = new Guid("A25AF4CC-C286-4578-152A-08D7833A33D5"),
        //            Email = "system@user",
        //            IsTourist = false,
        //            Passports = new List<Passport>() { new Passport() { PassportNumber = "999999999" } }
        //        });

        //        await db.SaveChangesAsync();
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }

        //    return Ok();
        //}

        //[HttpPut]
        //public async Task<IActionResult> InitDB()
        //{
        //    try
        //    {
        //        db.Members.Add(new Member()
        //        {
        //            Id = new Guid("A25AF4CC-C286-4578-152A-08D7833A33D5"),
        //            IsTourist = false,
        //            FirstName = "system",
        //            LastName = "user",
        //            Passports = new List<Passport>() { new Passport() { PassportNumber = "999999999" } }
        //        });

        //        await db.SaveChangesAsync();
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }

        //    return Ok();
        //}

    }
}