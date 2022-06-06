using Easyvat.Common.Config;
using Easyvat.Common.Helpers;
using Easyvat.Common.Model;
using Easyvat.Model.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Easyvat.Services.DataServices
{
    public class AccountService
    {
        //private readonly AuthConfiguration authConfig;
        private readonly EasyvatContext _easyvatContext;
        private readonly IConfiguration _config;
        public AccountService(EasyvatContext easyvatContext, IConfiguration config)
        {
            //this.authConfig = authConfig;
            _easyvatContext = easyvatContext;
            _config = config;
        }

        public string CreateToken(Member member)
        {
            //AuthConfiguration authConfig = new AuthConfiguration();
            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetValue<string>("Authorization:SecurityKey")));

            var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
            var tokenOptions = new JwtSecurityToken(
                issuer: _config.GetValue<string>("Authorization:Issuer"),
                audience: _config.GetValue<string>("Authorization:Audience"),
                claims: new List<Claim>() { new Claim(ClaimHelper.ClaimId, member.Id.ToString()) },
                expires: DateTime.Now.AddDays(Convert.ToDouble(_config.GetValue<string>("Authorization:Expires"))),
                signingCredentials: signinCredentials
            );

            var Jwtoken = new JwtSecurityTokenHandler().WriteToken(tokenOptions);

            return Jwtoken;
        }

        public async Task<Passport> GetPassportDetails(string memberId)
        {
           
                var data = (from pp in _easyvatContext.Passports
                            join mem in _easyvatContext.Members
                            on pp.MemberId equals mem.Id
                            join cou in _easyvatContext.Countries  //racheli
                            on pp.Nationality equals cou.ShortNameTree  //racheli



                            where pp.MemberId.ToString() == memberId
                            select new Passport
                            {
                                FirstName = pp.FirstName,
                                MemberId = pp.MemberId,
                                Id = pp.Id,
                                LastName = pp.LastName,
                                Nationality = pp.Nationality,
                                //Nationality = cou.EnglishName,   //racheli
                                PassportNumber = pp.PassportNumber,
                                BirthDate = pp.BirthDate,
                                IssueDate = pp.IssueDate,
                                ExpiredOn = pp.ExpiredOn
                            }).FirstOrDefault();
           

            return data;

            }
           
      

        public async Task<PersonalDetailsModel> GetPersonalDetails(string memberId)
        {
            var data = (from mem in _easyvatContext.Members
                        where mem.Id.ToString() == memberId
                        select new PersonalDetailsModel
                        {
                            Email=mem.Email,
                            MobileNumber=mem.MobileNumber,
                            RegionMobileNumber=mem.RegionMobileNumber,
                            MemberId=mem.Id.ToString()
                        }).FirstOrDefault();
            return data;
        }

        public async Task<bool> SaveUserDetails(UserDetailsModel model)
        {
            try
            {
                var userDet = await _easyvatContext.Passports.FirstOrDefaultAsync(x => x.PassportNumber.ToUpper() == model.PassportNumber.ToUpper());
                if (userDet != null)
                {
                    userDet.FirstName = model.FirstName;
                    userDet.LastName = model.LastName;
                    userDet.PassportNumber = model.PassportNumber;
                    userDet.ExpiredOn = model.ExpiredOn;
                    userDet.IssueDate = model.IssueDate;
                    userDet.BirthDate = model.BirthDate;
                    userDet.Nationality = model.Nationality;


                    _easyvatContext.Passports.Update(userDet);
                }
                else
                {
                    Passport passport = new Passport
                    {
                        FirstName = model.FirstName,
                        LastName = model.LastName,
                        Nationality = model.Nationality,
                        PassportNumber = model.PassportNumber,
                        ExpiredOn = model.ExpiredOn,
                        IssueDate = model.IssueDate,
                        BirthDate = model.BirthDate,
                        IssueIn = null,
                        ImagePassport = null,
                        ImageMember = null
                    };
                    _easyvatContext.Passports.Add(passport);
                }
                _easyvatContext.SaveChanges();
                return true;

            }
            catch (Exception ex)
            {

                return false;
            }
        }

        public async Task<bool> UpdatePersonalDetails(PersonalDetailsModel model)
        {
            try
            {
                var userDet = _easyvatContext.Members.FirstOrDefault(x => x.Id.ToString() == model.MemberId);
                if (userDet != null)
                {
                    userDet.Email = model.Email;
                    userDet.MobileNumber = model.MobileNumber;
                    _easyvatContext.Members.Update(userDet);
                    _easyvatContext.SaveChanges();
                }
                return true;

            }
            catch (Exception)
            {

                return false;
            }
        }

        public async Task<CommonReturnModel> GetVisitDetails()
        {
            CommonReturnModel returnModel = new CommonReturnModel();

            try
            {

            var cities = _easyvatContext.VisitCities.ToList();
            var areas = _easyvatContext.VisitAreas.ToList();
            var interest = _easyvatContext.VisitInterests.ToList();
            var purpose = _easyvatContext.VisitPurposes.ToList();
            var data = new
            {
                cities,
                areas,
                interest,
                purpose
            };
            //var data = (from area in _easyvatContext.VisitAreas
            //            from city in _easyvatContext.VisitCities
            //            from interest in _easyvatContext.VisitInterests
            //            select new { area, city, interest }
            //          ).ToList();
            
                returnModel.Message = "Successfully fetched records";
                returnModel.ResponseData = data;
                returnModel.StatusCode = HttpStatusCode.OK;

            }
            catch (Exception ex) 
            {
                returnModel.Message = ex.Message;
                returnModel.StatusCode = HttpStatusCode.InternalServerError;

            }
            return returnModel;

        }

        public async Task<CommonReturnModel> GetShopsVatDetails()
        {
            List<Shop> data = new List<Shop>();
            CommonReturnModel returnModel = new CommonReturnModel();
            try { 

             data = (from sh in _easyvatContext.Shops
                         
                            select new Shop
                            {
                                 Id=sh.Id,
                                 RegistrationNumber=sh.RegistrationNumber,
                                 Sector=sh.Sector,
                                 Name =sh.Name,
                                 Address =sh.Address,
                                 City=sh.City,
                                 Country=sh.Country,
                                 BranchNumber=sh.BranchNumber,
                                 Phone=sh.Phone,
                                 UserName =sh.UserName,
                                 Password=sh.Password,
                                 VatNumberShop =sh.VatNumberShop                                  
                            }).ToList();


                returnModel.Message = "Successfully fetched records";
                returnModel.ResponseData = data;
                returnModel.StatusCode = HttpStatusCode.OK;

        }
            catch (Exception ex)
            {
                returnModel.Message = ex.Message;
                returnModel.StatusCode = HttpStatusCode.InternalServerError;

            }
            return returnModel;

        }

        public async Task<CommonReturnModel> getCountryForForm()
        {
            CommonReturnModel response = new CommonReturnModel();
            var data = await _easyvatContext.Countries.Select(a => new { a.EnglishName,a.ShortNameTree }).ToListAsync();
            try
            {
                if (data.Count >0)
                {
                    response.ResponseData = data;
                    response.Message = "Fetched Successfully";
                }
            }
            catch (Exception ex)
            {
                response.StatusCode = HttpStatusCode.InternalServerError;
                response.Message = ex.Message;
                
            }
            return response;
        }
    }
}
