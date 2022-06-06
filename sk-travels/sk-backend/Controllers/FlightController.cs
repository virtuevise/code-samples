using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using sk_travel.DAL.Context;
using sk_travel.DAL.Tables;
using sk_travel.Model;
using sk_travel.Services;
using System.Net;

namespace sk_travel.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FlightController : ControllerBase
    {
        private readonly FlightService _service;
        public FlightController(FlightService service)
        {
            _service = service;
        }

        [HttpGet]
        [Route("get_flight_name")]
        public async Task<ResponseModel> getFlightsName()
        {
            return await _service.getFlightsName();
        }

        [HttpGet]
        [Route("get_flight_name_details")]
        public async Task<ResponseModel> getFlightsNameCode()
        {
            return await _service.getFlightsNameCode();
        }

        [HttpGet]
        [Route("get_flight_details")]
        public async Task<ResponseModel> getFlightDetails()
        {
            return await _service.getFlightDetails();
        }

        [HttpGet]
        [Route("get_all_flights")]
        public async Task<ResponseModel> getAllFlights()
        {
            return await _service.getAllFlights();
        }

        [HttpPost]
        [Route("flight_name")]
        public async Task<ResponseModel> addFlightsName(string flightName)
        {
            return await _service.addFlightsName(flightName);
        }


        [HttpPost]
        [Route("add_flights_details")]
        public async Task<ResponseModel> add_flights_details(FlightDetailsModel model)
        {

            return await _service.add_flights_details(model);
        }

        [HttpPost]
        [Route("update_flights_details")]
        public async Task<ResponseModel> update_flights_details(FlightDetailsModel model)
        {
            return await _service.update_flights_details(model);
        }

        [HttpDelete]
        [Route("delete_flights_details/{id}")]
        public async Task<ResponseModel> delete_flights_details(Guid id)
        {

            return await _service.delete_flights_details(id);
        }

        [HttpPost]
        [Route("add_flights")]
        public async Task<ResponseModel> addflights(AddFlights model)
        {

            return await _service.addflights(model);
        }

        [HttpPost]
        [Route("update_flights")]
        public async Task<ResponseModel> updtate_flights(AddFlights model)
        {
            return await _service.updtate_flights(model);
        }


        [HttpDelete]
        [Route("delete_flights/{id}")]
        public async Task<ResponseModel> delete_flights(Guid id)
        {
            return await _service.delete_flights(id);
        }
    }
}
