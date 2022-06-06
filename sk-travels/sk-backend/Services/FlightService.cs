using Microsoft.EntityFrameworkCore;
using sk_travel.DAL.Context;
using sk_travel.DAL.Tables;
using sk_travel.Model;
using System.Net;

namespace sk_travel.Services
{
    public class FlightService
    {
        private readonly TableContext _tblctx;
        public FlightService(TableContext tblCtx)
        {
            _tblctx = tblCtx;
        }

        public async Task<ResponseModel> getFlightsName()
        {
            ResponseModel Response = new ResponseModel();
            try
            {
                var data = await _tblctx.Sk_Flight_info.Where(c => c.IsActive == true && c.IsDeleted == false).Select(c => new { c.id, c.Flight_name }).ToListAsync();

                Response.Data = data;
                Response.StatusCode = HttpStatusCode.OK;

            }
            catch (Exception exp)
            {
                Response.StatusCode = HttpStatusCode.InternalServerError;
                Response.Message = exp.Message;
            }
            return Response;
        }
        public async Task<ResponseModel> getFlightDetails()
        {
            ResponseModel Response = new ResponseModel();
            try
            {
                var data = await _tblctx.Sk_Flight_Info_Details.Where(c => c.IsActive == true && c.IsDeleted == false).Select(c => new { c.Id, c.Flight_code, c.Flight_type }).ToListAsync();
                Response.Data = data;
                Response.StatusCode = HttpStatusCode.OK;
            }
            catch (Exception exp)
            {
                Response.StatusCode = HttpStatusCode.InternalServerError;
                Response.Message = exp.Message;
            }

            return Response;
        }
        public async Task<ResponseModel> getFlightsNameCode()
        {
            ResponseModel Response = new ResponseModel();
            try
            {
                var data = await (from a in _tblctx.Sk_Flight_info
                                  join b in _tblctx.Sk_Flight_Info_Details on a.id equals b.Sk_flight_infoid
                                  where a.IsActive == true && a.IsDeleted == false && b.IsActive == true && b.IsDeleted == false
                                  group new { a, b } by new { a.Flight_name, b.Flight_type, b.Sk_flight_infoid } into grp
                                  select new
                                  {
                                      flightId = grp.Key.Sk_flight_infoid,
                                      flightName = grp.Key.Flight_name,
                                      flightCode = String.Join(",", _tblctx.Sk_Flight_Info_Details.Where(c => c.IsActive == true && c.IsDeleted == false && c.Sk_flight_infoid == grp.Key.Sk_flight_infoid).Select(c => c.Flight_code)),
                                      flightType = grp.Key.Flight_type,
                                  }).ToListAsync();
                foreach (var item in data)
                {

                }
                Response.Data = data;
                Response.StatusCode = HttpStatusCode.OK;

            }
            catch (Exception exp)
            {
                Response.StatusCode = HttpStatusCode.InternalServerError;
                Response.Message = exp.Message;
            }
            return Response;
        }

        public async Task<ResponseModel> getAllFlights()
        {
            ResponseModel Response = new ResponseModel();
            try
            {
                var data = await (from info in _tblctx.Sk_Flight_info
                                  join details in _tblctx.Sk_Flight_Info_Details on info.id equals details.Sk_flight_infoid
                                  join mapping in _tblctx.Sk_Fligth_location_Mapping on details.Id equals mapping.Sk_Flight_Info_Detailsid
                                  join date in _tblctx.Sk_Flight_date_Mapping on mapping.id equals date.Sk_Flight_Location_Mappingid
                                  where mapping.IsActive == true && mapping.IsDeleted == false && date.IsActive == true && date.IsDeleted == false
                                  select new
                                  {
                                      flightName = info.Flight_name,
                                      flightCode = details.Flight_code,
                                      flightType = details.Flight_type,
                                      FlightMapId = mapping.id,
                                      flightFrom = mapping.Location_from_code,
                                      flightTo = mapping.Location_to_code,
                                      FlightClass = mapping.Fligth_class,
                                      VailidTillDate = mapping.ValidTill_date,
                                      VailidTillTime = mapping.ValidTill_time,
                                      TotalSeat = mapping.Total_seat,
                                      AvailableSeat = mapping.Available_seat,
                                      RealTimeBooking = mapping.RealTime_booking,
                                      PnrNo = mapping.Pnr_no,
                                      DepartureTime = mapping.Departure_time,
                                      ArrivalTime = mapping.Arrival_time,
                                      weekDays = date.WeekDays,


                                  }).ToListAsync();
                var location = await _tblctx.Sk_Location.Where(c => c.IsActive == true && c.IsDeleted == false).Select(c => new { c.Name, c.Code }).ToListAsync();
                string flightFrom, flightTo;
                foreach (var item in location)
                {
                    if (item.Code == data.Select(c => c.flightFrom).ToString())
                    {
                        flightFrom = item.Name;
                    }
                    if (item.Code == data.Select(c => c.flightTo).ToString())
                    {
                        flightTo = item.Name;
                    }
                }
                Response.Data = data;
                Response.StatusCode = HttpStatusCode.OK;

            }
            catch (Exception exp)
            {
                Response.StatusCode = HttpStatusCode.InternalServerError;
                Response.Message = exp.Message;
            }
            return Response;
        }

        public async Task<ResponseModel> addFlightsName(string flightName)
        {
            ResponseModel Response = new ResponseModel();
            try
            {
                var data = await _tblctx.Sk_Flight_info.FirstOrDefaultAsync(c => c.IsActive == true && c.IsDeleted == false && c.Flight_name == flightName);
                if (data == null)
                {
                    Sk_Flight_info table = new Sk_Flight_info
                    {
                        Flight_name = flightName.ToUpper().Trim(),
                        IsActive = true,
                        IsDeleted = false,
                    };
                    _tblctx.Sk_Flight_info.Add(table);
                    var isSaved = await _tblctx.SaveChangesAsync();
                    if (isSaved > 0)
                    {
                        Response.Message = "flight added";
                        Response.StatusCode = HttpStatusCode.OK;
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

        public async Task<ResponseModel> add_flights_details(FlightDetailsModel model)
        {
            ResponseModel Response = new ResponseModel();
            var flight = await _tblctx.Sk_Flight_info.FirstOrDefaultAsync(c => c.IsActive == true && c.IsDeleted == false && c.Flight_name == model.Flight_Name.ToUpper().Trim());
            var details = await _tblctx.Sk_Flight_Info_Details.FirstOrDefaultAsync(c => c.IsActive == true && c.IsDeleted == false && c.Sk_flight_infoid == flight.id);
            var temp = model.Flight_Code.Select(c => c.Value).ToList();
            try
            {
                if (details == null)
                {
                    for (int i = 0; i < temp.Count; i++)
                    {
                        Sk_Flight_Info_Details fightDetails = new Sk_Flight_Info_Details
                        {
                            Flight_code = temp[i],
                            Flight_type = model.Flight_Type.ToUpper().Trim(),
                            Sk_flight_infoid = flight.id,
                            IsActive = true,
                            IsDeleted = false,
                        };
                        _tblctx.Sk_Flight_Info_Details.Add(fightDetails);
                    }

                    var IsSaved = await _tblctx.SaveChangesAsync();
                    if (IsSaved > 0)
                    {
                        Response.Message = " Added";
                        Response.StatusCode = HttpStatusCode.OK;
                    }

                }
                else
                {

                    Response.Message = "already exist";
                    Response.StatusCode = HttpStatusCode.BadRequest;
                }
            }
            catch (Exception exp)
            {
                Response.StatusCode = HttpStatusCode.InternalServerError;
                Response.Message = exp.Message;
            }
            return Response;
        }

        public async Task<ResponseModel> update_flights_details(FlightDetailsModel model)
        {
            ResponseModel Response = new ResponseModel();
            var flight = await _tblctx.Sk_Flight_info.FirstOrDefaultAsync(c => c.IsActive == true && c.IsDeleted == false && c.id == model.FlightNameId);
            var temp = model.Flight_Code.Select(c => c.Value).ToList();
            try
            {
                var details = await _tblctx.Sk_Flight_Info_Details.Where(c => c.IsActive == true && c.IsDeleted == false && c.Sk_flight_infoid == flight.id).ToListAsync();
                int num = 0;
                int lap = details.Count;

                for (int i = 0; i < details.Count; i++)
                {
                    bool midVal = false;
                    for (int j = num; j < temp.Count; j++)
                    {
                        if (i < lap)
                        {
                            if (details[i].Flight_code == temp[j])
                            {
                                num++;
                                midVal = true;
                                break;
                            }
                            else
                            {
                                details[i].IsDeleted = true;
                                details[i].IsActive = false;
                                _tblctx.Sk_Flight_Info_Details.Update(details[i]);
                            }
                        }
                    }

                    if (i >= temp.Count && midVal == false)
                    {
                        details[i].IsDeleted = true;
                        details[i].IsActive = false;
                        _tblctx.Sk_Flight_Info_Details.Update(details[i]);
                    }

                }


                for (int i = 0; i < temp.Count; i++)
                {
                    var isExist = await _tblctx.Sk_Flight_Info_Details.FirstOrDefaultAsync(c => c.IsActive == true && c.IsDeleted == false && c.Sk_flight_infoid == flight.id && c.Flight_code == temp[i]);
                    if (isExist == null)
                    {
                        Sk_Flight_Info_Details fightDetails = new Sk_Flight_Info_Details
                        {
                            Flight_code = temp[i],
                            Flight_type = model.Flight_Type.ToUpper().Trim(),
                            Sk_flight_infoid = flight.id,
                            IsActive = true,
                            IsDeleted = false,
                        };
                        flight.Flight_name = model.Flight_Name.ToUpper().Trim();
                        _tblctx.Sk_Flight_Info_Details.Add(fightDetails);
                    }
                    else
                    {
                        flight.Flight_name = model.Flight_Name.ToUpper().Trim();
                        isExist.Flight_type = model.Flight_Type.ToUpper().Trim();
                    }
                }

                var IsSaved = await _tblctx.SaveChangesAsync();
                if (IsSaved > 0)
                {
                    Response.Message = " Updated Successfully";
                    Response.StatusCode = HttpStatusCode.OK;
                }
                else
                {
                    Response.Message = "Nothing to update";
                    Response.StatusCode = HttpStatusCode.BadRequest;
                }
            }
            catch (Exception exp)
            {
                Response.StatusCode = HttpStatusCode.InternalServerError;
                Response.Message = exp.Message;
            }
            return Response;
        }

        public async Task<ResponseModel> delete_flights_details(Guid id)
        {
            ResponseModel Response = new ResponseModel();
            var details = await _tblctx.Sk_Flight_Info_Details.Where(c => c.IsActive == true && c.IsDeleted == false && c.Sk_flight_infoid == id).ToListAsync();
            try
            {
                for (int i = 0; i < details.Count; i++)
                {
                    details[i].IsActive = false;
                    details[i].IsDeleted = true;
                    _tblctx.Sk_Flight_Info_Details.Update(details[i]);
                }
                var IsSaved = await _tblctx.SaveChangesAsync();
                if (IsSaved > 0)
                {
                    Response.Message = "Deleted";
                    Response.StatusCode = HttpStatusCode.OK;
                }
            }
            catch (Exception exp)
            {
                Response.StatusCode = HttpStatusCode.InternalServerError;
                Response.Message = exp.Message;
            }
            return Response;
        }

        public async Task<ResponseModel> addflights(AddFlights model)
        {
            ResponseModel Response = new ResponseModel();
            var details = await _tblctx.Sk_Flight_Info_Details.FirstOrDefaultAsync(c => c.Flight_code == model.FlightCode);
            var fligthMap = await _tblctx.Sk_Fligth_location_Mapping.FirstOrDefaultAsync(c => c.IsActive == true && c.IsDeleted == false && c.Sk_Flight_Info_Detailsid == details.Id);

            try
            {
                if (fligthMap == null)
                {
                    Sk_Flight_location_Mapping locationTbl = new Sk_Flight_location_Mapping();
                    Sk_Flight_date_Mapping dateTbl = new Sk_Flight_date_Mapping();

                    locationTbl.Location_from_id = model.LocationFromId;
                    locationTbl.Location_from_code = model.LocationFromCode;
                    locationTbl.Location_to_id = model.LocationToId;
                    locationTbl.Location_to_code = model.LocationToCodeId;
                    locationTbl.Fligth_class = "buss";
                    locationTbl.ValidTill_date = model.ValidTillDate;
                    locationTbl.ValidTill_time = model.ValidTillTime;
                    locationTbl.SupplierId = new Guid("FC3FF966-5899-4693-8272-A823A1477A06");
                    locationTbl.Total_seat = model.TotalSeat;
                    locationTbl.Available_seat = model.AvailableSeat;
                    locationTbl.RealTime_booking = model.RealTimeBooking;
                    locationTbl.Pnr_no = model.PnrNo;
                    locationTbl.Arrival_time = model.ArrivalTime;
                    locationTbl.Departure_time = model.DepartureTime;
                    locationTbl.Sk_Flight_Info_Detailsid = details.Id;
                    locationTbl.IsActive = true;
                    locationTbl.IsDeleted = false;

                    _tblctx.Sk_Fligth_location_Mapping.Add(locationTbl);

                    dateTbl.WeekDays = model.WeekDays;
                    dateTbl.Flight_time = "";
                    dateTbl.Meridian = "";
                    dateTbl.Sk_Flight_Location_Mappingid = locationTbl.id;
                    dateTbl.IsActive = true;
                    dateTbl.IsDeleted = false;

                    _tblctx.Sk_Flight_date_Mapping.Add(dateTbl);
                    var IsSaved = await _tblctx.SaveChangesAsync();
                    if (IsSaved > 0)
                    {
                        Response.Message = "Saved";
                        Response.StatusCode = HttpStatusCode.OK;
                    }
                }
                else
                {
                    Response.Message = "Already Exist";
                    Response.StatusCode = HttpStatusCode.BadRequest;
                }
            }
            catch (Exception exp)
            {
                Response.StatusCode = HttpStatusCode.InternalServerError;
                Response.Message = exp.Message;
            }

            return Response;
        }

        public async Task<ResponseModel> updtate_flights(AddFlights model)
        {
            ResponseModel Response = new ResponseModel();
            try
            {
                var locationTbl = await _tblctx.Sk_Fligth_location_Mapping.FirstOrDefaultAsync(c => c.IsActive == true && c.IsDeleted == false && c.id == model.FlightMapId && c.id == model.FlightMapId);
                var dateTbl = await _tblctx.Sk_Flight_date_Mapping.FirstOrDefaultAsync(c => c.IsActive == true && c.IsDeleted == false && c.Sk_Flight_Location_Mappingid == locationTbl.id);

                locationTbl.Location_from_id = model.LocationFromId;
                locationTbl.Location_from_code = model.LocationFromCode;
                locationTbl.Location_to_id = model.LocationToId;
                locationTbl.Location_to_code = model.LocationToCodeId;
                locationTbl.Fligth_class = "first class";
                locationTbl.ValidTill_date = model.ValidTillDate;
                locationTbl.ValidTill_time = model.ValidTillTime;
                locationTbl.Total_seat = model.TotalSeat;
                locationTbl.Available_seat = model.AvailableSeat;
                locationTbl.RealTime_booking = model.RealTimeBooking;
                locationTbl.Pnr_no = model.PnrNo;
                locationTbl.Arrival_time = model.ArrivalTime;
                locationTbl.Departure_time = model.DepartureTime;
                dateTbl.WeekDays = model.WeekDays;

                _tblctx.Sk_Fligth_location_Mapping.Update(locationTbl);
                _tblctx.Sk_Flight_date_Mapping.Update(dateTbl);

                var isSaved = await _tblctx.SaveChangesAsync();
                if (isSaved > 0)
                {
                    Response.Message = "Successfully Saved";
                    Response.StatusCode = HttpStatusCode.OK;
                }
            }
            catch (Exception exp)
            {
                Response.StatusCode = HttpStatusCode.InternalServerError;
                Response.Message = exp.Message;
            }
            return Response;
        }

        public async Task<ResponseModel> delete_flights(Guid id)
        {
            ResponseModel Response = new ResponseModel();
            try
            {
                var mappingTbl = await _tblctx.Sk_Fligth_location_Mapping.FirstOrDefaultAsync(c => c.IsActive == true && c.IsDeleted == false && c.id == id);
                var dateTbl = await _tblctx.Sk_Flight_date_Mapping.FirstOrDefaultAsync(c => c.Sk_Flight_Location_Mappingid == mappingTbl.id);

                mappingTbl.IsActive = false;
                mappingTbl.IsDeleted = true;
                dateTbl.IsActive = false;
                dateTbl.IsDeleted = true;
                _tblctx.Sk_Fligth_location_Mapping.Update(mappingTbl);
                _tblctx.Sk_Flight_date_Mapping.Update(dateTbl);
                var IsSaved = await _tblctx.SaveChangesAsync();
                if (IsSaved > 0)
                {
                    Response.Message = "Successfully Deleted";
                    Response.StatusCode = HttpStatusCode.OK;
                }

            }
            catch (Exception exp)
            {
                Response.StatusCode = HttpStatusCode.InternalServerError;
                Response.Message = exp.Message;
            }
            return Response;
        }

    }

}
