using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using sk_travel.DAL.Context;
using sk_travel.DAL.Tables;
using sk_travel.Model;
using System.Globalization;
using System.Net;

namespace sk_travel.Services
{
    public class UserService
    {
        private readonly TableContext _tblctx;
        public UserService(TableContext tblCtx)
        {
            _tblctx = tblCtx;
        }

        public async Task<ResponseModel> searchFlight(SearchFlightModel model)
        {
            ResponseModel Response = new ResponseModel();
            try
            {
                List<AllFlightReturnModel> returnModel = new List<AllFlightReturnModel>();
                var flightMap = _tblctx.Sk_Fligth_location_Mapping.Where(c => c.IsActive == true && c.IsDeleted == false).ToList();

                var data = flightMap.Where(c => getdate(c.ValidTill_date) >= getdate(model.TravelDate)).ToList();
                if (data.Count > 0)
                {
                    foreach (var item in data)
                    {
                        if (item.Location_from_id == new Guid( model.LocationFrom) && item.Location_to_id == new Guid(model.LocationTo))
                        {
                            AllFlightReturnModel tempModel = new AllFlightReturnModel();
                            var details = await _tblctx.Sk_Flight_Info_Details.Where(c => c.Id == item.Sk_Flight_Info_Detailsid).Select(c => new { c.Flight_code, c.Flight_type,c.Sk_flight_infoid }).FirstOrDefaultAsync();
                            var nameId = await _tblctx.Sk_Flight_info.Where(c => c.id == details.Sk_flight_infoid).Select(c => new { c.id, c.Flight_name}).FirstOrDefaultAsync();
                            var tempLocation = await _tblctx.Sk_Location.Where(c => c.IsActive == true && c.IsDeleted == false).ToListAsync();
                            var weekday = await _tblctx.Sk_Flight_date_Mapping.Where(c => c.Sk_Flight_Location_Mappingid == item.id).Select(c => c.WeekDays).FirstOrDefaultAsync();
                            if (nameId.id == new Guid(model.Airline))
                            {
                                tempModel.FlightName = nameId.Flight_name;
                                tempModel.FlightCode = details.Flight_code;
                                tempModel.FlightType = details.Flight_type;
                                tempModel.FlightMapId = item.id;
                                foreach (var location in tempLocation)
                                {
                                    if (location.Code == item.Location_from_code)
                                    {
                                        tempModel.FlightFrom = location.Name;
                                    }
                                    if (location.Code == item.Location_to_code)
                                    {
                                        tempModel.FlightTo = location.Name;
                                    }
                                }
                                tempModel.FlightClass = item.Fligth_class;
                                tempModel.ValidTillDate = item.ValidTill_date;
                                tempModel.ValidTillTime = item.ValidTill_time;
                                tempModel.TotalSeat = item.Total_seat;
                                tempModel.AvailableSeat = item.Available_seat;
                                tempModel.RealTimeBooking = item.RealTime_booking;
                                tempModel.PnrNo = item.Pnr_no;
                                tempModel.DepartureTime = item.Departure_time;
                                tempModel.ArrivalTime = item.Arrival_time;
                                tempModel.WeekDays = weekday;
                                returnModel.Add(tempModel);
                            }
                        }

                    }

                    if (returnModel.Count > 0)
                    {
                        Response.Message = "Successfully Fetched";
                        Response.StatusCode = HttpStatusCode.OK;
                        Response.Data = returnModel;
                    }
                    else
                    {
                        Response.Message = "Not Found";
                        Response.StatusCode = HttpStatusCode.NotFound;
                    }
                }
            }
            catch (Exception exp)
            {
                Response.StatusCode = HttpStatusCode.InternalServerError;
                Response.Message = exp.Message;
            }
            return Response;
        }


        private DateOnly getdate(string date)
        {
            var data = DateOnly.ParseExact(date, "yyyy-MM-dd", CultureInfo.InvariantCulture);
            return data;
        }

        //public async Task<Sk_Locations> GetLocation(string id)
        //{
        //    var result = await _tblctx.sk_Location.FirstOrDefaultAsync(c => c.IsActive == true && c.IsDeleted == false && c.id == new Guid(id));
        //    if (result == null)
        //    {
        //        return null;
        //    }
        //    else
        //    {
        //        return result;
        //    }

        //}
    }
}
