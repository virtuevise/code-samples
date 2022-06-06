using Microsoft.EntityFrameworkCore;
using sk_travel.DAL.Context;
using sk_travel.DAL.Tables;
using sk_travel.Model;
using System.Net;

namespace sk_travel.Services
{
    public class LocationService
    {
        private readonly TableContext _tblctx;

        public LocationService(TableContext tblCtx)
        {
            _tblctx = tblCtx;
        }

        public async Task<ResponseModel> getLocations()
        {
            ResponseModel Response = new ResponseModel();
            try
            {
                var data = await _tblctx.Sk_Location.Where(c => c.IsActive == true && c.IsDeleted == false).Select(c => new { c.id, c.Name, c.Code }).ToListAsync();
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

        public async Task<ResponseModel> addLocations(LocationModel model)
        {
            ResponseModel Response = new ResponseModel();
            try
            {
                var data = await _tblctx.Sk_Location.FirstOrDefaultAsync(c => c.IsActive == true && c.IsDeleted == false && c.Code == model.Code);
                if (data == null)
                {
                    Sk_Locations locationTbl = new Sk_Locations
                    {
                        Name = model.Name.ToUpper().Trim(),
                        Code = model.Code.ToUpper().Trim(),
                        IsActive = true,
                        IsDeleted = false,
                    };

                    _tblctx.Sk_Location.Add(locationTbl);
                    var isSaved = await _tblctx.SaveChangesAsync();
                    if (isSaved > 0)
                    {
                        Response.Message = "Added Successfully";
                        Response.StatusCode = HttpStatusCode.OK;
                    }
                }
                else
                {
                    Response.Message = "location already exist";
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

        public async Task<ResponseModel> updateLocation(LocationModel model, Guid id)
        {
            ResponseModel Response = new ResponseModel();
            try
            {
                var data = await _tblctx.Sk_Location.FirstOrDefaultAsync(c => c.IsActive == true && c.IsDeleted == false && c.id == id);
                if (data != null)
                {
                    data.Name = model.Name.ToUpper().Trim();
                    data.Code = model.Code.ToUpper().Trim();

                    _tblctx.Sk_Location.Update(data);
                    var isSaved = await _tblctx.SaveChangesAsync();
                    if (isSaved > 0)
                    {
                        Response.Message = "Updated Successfully";
                        Response.StatusCode = HttpStatusCode.OK;
                    }
                }
                else
                {
                    Response.Message = "not updated";
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

        public async Task<ResponseModel> deleteLocations(Guid id)
        {
            ResponseModel Response = new ResponseModel();
            try
            {
                var data = await _tblctx.Sk_Location.FirstOrDefaultAsync(c => c.IsActive == true && c.IsDeleted == false && c.id == id);
                if (data != null)
                {
                    data.IsActive = false;
                    data.IsDeleted = true;

                    _tblctx.Sk_Location.Update(data);
                    var isSaved = await _tblctx.SaveChangesAsync();
                    if (isSaved > 0)
                    {
                        Response.Message = "Deleted Successfully";
                        Response.StatusCode = HttpStatusCode.OK;
                    }
                }
                else
                {
                    Response.Message = "Please Add The Location";
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

    }
}
