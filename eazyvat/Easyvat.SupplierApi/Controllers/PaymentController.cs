using AutoMapper;
using Easyvat.Common.Model;
using Easyvat.Services.DataServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Easyvat.SupplierApi.Controllers
{
    [Produces("application/json")]
    [Route("Payment")]
    public class PaymentController : ControllerBase
    {
        private readonly PaymentServices _paymentServices;
        private readonly IMapper mapper;


        public PaymentController(PaymentServices paymentServices, IMapper mapper)
        {
            _paymentServices = paymentServices;
            this.mapper = mapper;
        }

        [Route("GetUserSavedCards")]
        [HttpGet]
        public async Task<ActionResult> GetUserSavedCards(string userId)
        {
            var savedCards =await _paymentServices.GetSavedCards(userId);
            if (savedCards.Count > 0)
            {
                return Ok(savedCards);
            }
            else
            {
                return NotFound("No cards Found");
            }
        }

        [Route("AddUserCard")]
        [HttpPost]
        public async Task<ActionResult> AddUserCard([FromBody] SaveCardModel cardModel)
        {
            string user = await _paymentServices.SaveCard(cardModel);
            if (user.Length>0)
            {
                return Ok(new { statusCode = 200, responseData = user }) ;
            }
            else
            {
                return NotFound(new { statusCode = 400 });
            }
        }

        [Route("DeleteUserCard")]
        [HttpPost]
        public async Task<ActionResult> DeleteUserCard([FromBody] SaveCardModel cardModel)
        {
         
            bool isDelet = await _paymentServices.DeleteCard(cardModel);
            if (isDelet)
            {
                return Ok(new { statusCode = 200, message = "Successfully Delete Credit-Card" });
            }
            else
            {
                return NotFound(new { statusCode = 400, message = "No cards Found" });

            }
        }
    }
}
