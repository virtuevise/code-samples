using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using sk_travel.Model;
using sk_travel.Services;

namespace sk_travel.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly AccountService _service;
        public AccountController( AccountService service)
        {
            _service = service;
        }

        [HttpPost, AllowAnonymous]
        [Route("Register")]
        public async Task<ResponseModel> Register(RegisterModel request)
        {
            return await _service.Register(request);
        }

        [HttpPost]
        [Route("Login")]
        public async Task<ResponseModel> login(LoginModel model)
        {
           return await _service.login(model);
        }


    }
}
