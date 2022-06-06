using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using sk_travel.Model;
using sk_travel.Services;
using System.Net;

namespace sk_travel.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserService _service;
       public UserController(UserService userService)
        {
            _service = userService;
        }

        [Route("search_flights")]
        [HttpPost]

        public async Task<ResponseModel> searchFlight(SearchFlightModel model)
        {
            return await _service.searchFlight(model);
        }
    }
}
