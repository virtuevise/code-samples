using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using sk_travel.DAL.Context;
using sk_travel.DAL.Tables;
using sk_travel.Model;
using sk_travel.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;

namespace sk_travel.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly AdminService _adminService;
        public AdminController(AdminService service)
        {
          _adminService = service;
            
        }

        [HttpGet]
        [Route("getAllRole")]
        public async Task<ResponseModel> getAllRoll()
        {
            return await _adminService.getAllRole();
        }
        [HttpGet]
        [Route("GetAllUser")]
        public async Task<ResponseModel> GetAllUser()
        {
            return await _adminService.GetAllUser();
        }

        [HttpGet]
        [Route("getRoleModule")]
        public async Task<ResponseModel> getRollModule()
        {
            return await _adminService.getRoleModule();
        }

        [HttpPost]
        [Route("addRoleValidation")]
        public async Task<ResponseModel> addRollValidation(RoleModel model)
        {
            return await _adminService.addRoleValidation(model);
        }

        [HttpPost]
        [Route("updateRoleValidation")]
        public async Task<ResponseModel> updateRollValidation(RoleModel model)
        {
            return await _adminService.updateRoleValidation(model);
        }

        [HttpDelete]
        [Route("deleteRoleValidation/{id}")]
        public async Task<ResponseModel> deleteRollValidation(string id)
        {
            return await _adminService.deleteRoleValidation(id);
        }

        [HttpGet]
        [Route("getAllModule")]
        public async Task<ResponseModel> getAllModule()
        {
            return await _adminService.getAllModule();
        }

        [HttpPost]
        [Route("add-user")]

        public async Task<ResponseModel> addUser(User user)
        {   
           return await _adminService.addUser(user);
        }

        [HttpPost]
        [Route("update-user")]

        public async Task<ResponseModel> updateUser(User user)
        {
            return await _adminService.updateUser(user);
        }

        [HttpDelete]
        [Route("deleteUserById/{id}")]
        public async Task<ResponseModel> deleteUserById(string id)
        {
            return await _adminService.deleteUserById(id);  
        }    

    }
}
