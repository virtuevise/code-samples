using Easyvat.Common.Model;
using Easyvat.Services.DataServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Easyvat.SupplierApi.Controllers
{
    [Produces("application/json")]
    [Route("Accounts")]
    public class AccountsController : ControllerBase
    {
        private readonly AccountService _accountService;
        public AccountsController(AccountService accountService)
        {
            _accountService = accountService;
        }

        [AllowAnonymous]
        [Route("GetAccountDetailById")]
        [HttpGet]
        public async Task<ActionResult> GetAccountDetailById(string memberId)
        {
            try
            {

                var data = _accountService.GetPassportDetails(memberId);
                if (data != null)
                {
                    return Ok(new { statusCode = 200, responseData = data });
                }
                else
                {
                    return Ok(new { statusCode = 404 });
                }

            }
            catch (Exception ex)
            {

                return Ok(new { statusCode = 404, message = ex.Message });
            }
        }

        [AllowAnonymous]
        [Route("GetPersonalDetailById")]
        [HttpGet]
        public async Task<ActionResult> GetPersonalDetailById(string memberId)
        {
            try
            {

                var data = _accountService.GetPersonalDetails(memberId);
                if (data != null)
                {
                    return Ok(new { statusCode = 200, responseData = data });
                }
                else
                {
                    return Ok(new { statusCode = 404 });
                }

            }
            catch (Exception ex)
            {

                return Ok(new { statusCode = 404, message = ex.Message });
            }
        }


        [AllowAnonymous]
        [Route("updatePersonalDetails")]
        [HttpPost]
        public async Task<ActionResult> UpdatePersonalDetails([FromBody] PersonalDetailsModel cardModel)
        {
            bool isSaved = await _accountService.UpdatePersonalDetails(cardModel);
            if (isSaved)
            {
                return Ok(new { statusCode = 200, message= "Successfully Update Details" });
            }
            else
            {
                return NotFound(new { statusCode= 400, message= "Can't Update details" });
            }
        }
        
        
        [AllowAnonymous]
        [Route("saveUserDetails")]
        [HttpPost]
        public async Task<ActionResult> saveUserDetails([FromBody] UserDetailsModel cardModel)
        {
            bool isSaved = await _accountService.SaveUserDetails(cardModel);
            if (isSaved)
            {
                return Ok(new { statusCode = 200, message = "Successfully Save UserDetails" });
            }
            else
            {
               return NotFound(new{ statusCode = 400, message = "No cards Found" });
               
            }
        }

        [AllowAnonymous]
        [Route("getVisitInfo")]
        [HttpGet]
        public async Task<ActionResult> GetVisitInfo()
        {
            var data = _accountService.GetVisitDetails();
            return Ok(data);
        }


        [AllowAnonymous]
        [Route("getShopsVatInfo")]
        [HttpGet]
        public async Task<ActionResult> GetShopsVatInfo()
        {
            var data = _accountService.GetShopsVatDetails();
            return Ok(data);
        }

        [Route("getCountryForForm")]
        [HttpGet]
        public async Task<ActionResult> getCountryForForm()
        {
            var data = await _accountService.getCountryForForm();
            return Ok(data);
        }
    }
}
