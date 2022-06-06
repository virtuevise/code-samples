using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using sk_travel.DAL.Context;
using sk_travel.DAL.Tables;
using sk_travel.Model;
using sk_travel.Services;
using System.Net;

namespace sk_travel.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LocationController : ControllerBase
    {
        private readonly LocationService _service;
        public LocationController(LocationService service)
        {
            _service = service; 
        }

        [HttpGet]
        [Route("locations")]
        public async Task<ResponseModel> getLocations()
        {
            return await _service.getLocations();
        }

        [HttpPost]
        [Route("add-locations")]
        public async Task<ResponseModel> addLocations(LocationModel model)
        {
            
            return await _service.addLocations(model);
        }


        [HttpPost]
        [Route("update-locations/{id}")]
        public async Task<ResponseModel> updateLocation(LocationModel model,Guid id)
        {
            return await _service.updateLocation(model,id);
        }


        [HttpDelete]
        [Route("Delete-locations/{id}")]
        public async Task<ResponseModel> deleteLocations(Guid id)
        {
            return await _service.deleteLocations(id);
        }
    }
}
