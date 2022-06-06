using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Easyvat.Api.ViewModel;
using Easyvat.Common.Helpers;
using Easyvat.Common.Model;
using Easyvat.Model.Models;
using Easyvat.Services.DataServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Easyvat.Api.Controllers
{
    [Produces("application/json")]
    [Route("[controller]")]
    [Authorize]
    public class MemberController : ControllerBase
    {
        private readonly MemberService memberService;
        private readonly VisitService visitService;
        private readonly AccountService accountService;
        private readonly PassportService passportService;
        private readonly IMapper Mapper;
        public MemberController(MemberService memberService, AccountService accountService, PassportService passportService, VisitService visitService, IMapper Mapper)
        {
            this.memberService = memberService;
            this.accountService = accountService;
            this.visitService = visitService;
            this.passportService = passportService;
            this.Mapper = Mapper;
        }

        [HttpPut("member")]
        public async Task<ActionResult> UpdatePersonalDetails([FromBody]PersonalDetailsDto personalDetails)
        {
            var memberId = new Guid(User.ClaimValue(ClaimHelper.ClaimId));

            var member = await memberService.GetMemberById(memberId);

            member.Email = personalDetails.Email;

            member.MobileNumber = personalDetails.MobileNumber;

            await memberService.UpdateMember(member);

            return Ok();
        }

        [AllowAnonymous]
        [HttpPost("visit")]
        public async Task<ActionResult> UpdateVisitDetails([FromBody]VisitInfo visit)
        {
            //var memberId = new Guid(User.ClaimValue(ClaimHelper.ClaimId));
            //var memberId = visit.MemberId;
            //var status = memberService.getVisitMemberById(memberId);
           
            //if (status != null) {
            //    await visitService.DeleteVisit(visitData);
            //}
            //Visit visitData = new Visit
            //{
            //    AreaId = string.Join(",", visit.AreaId),
            //    CityId = string.Join(",", visit.CityId),
            //    EndDate = visit.EndDate,
            //    InterestId = string.Join(",", visit.InterestId),
            //    MemberId = visit.MemberId,
            //    PurposeId = visit.PurposeId,
            //    SpecialOffers = visit.SpecialOffers

            //};

            await visitService.AddVisit(visit);

            return Ok();
        }


        [HttpGet("passport")]
        public async Task<ActionResult<PassportDetailsDto>> GetPassportDetails()
        {
            var memberId = new Guid(User.ClaimValue(ClaimHelper.ClaimId));

            var result = await passportService.GetMemberPassport(memberId);

            return Ok(Mapper.Map<PassportDetailsDto>(result));
        }

        [HttpGet("personal")]
        public async Task<ActionResult<PersonalDetailsDto>> GetPersonalDetails()
        {
            var memberId = new Guid(User.ClaimValue(ClaimHelper.ClaimId));

            var result = await memberService.GetMemberById(memberId);

            return Ok(Mapper.Map<PersonalDetailsDto>(result));
        }

        //NOTE: New code with memberId as params
        [AllowAnonymous]
        [HttpGet("visit/{id}")]
        public async Task<ActionResult> GetVisitDetails(Guid id)
        {
            //var memberId = new Guid(User.ClaimValue(ClaimHelper.ClaimId));

            var result = await visitService.GetMemberVisit(id);
            if (result != null)
            {
                //VisitDto visitDto = new VisitDto
                //{
                //    AreaId = result.AreaId.Split(",").Select(x => Convert.ToInt32(x)).ToArray(),
                //    CityId = result.CityId.Split(",").Select(x => Convert.ToInt32(x)).ToArray(),
                //    InterestId = result.InterestId.Split(",").Select(x => Convert.ToInt32(x)).ToArray(),
                //    PurposeId = result.PurposeId,
                //    EndDate = result.EndDate,
                //    MemberId = result.MemberId,
                //    SpecialOffers = result.SpecialOffers
                //};
                return Ok(result);
            }
            else
            {
                return NotFound();
            }
        }
        //NOTE: Old Code with memberId from claims
        //[HttpGet("visit")]
        //public async Task<ActionResult<PassportDetailsDto>> GetVisitDetails()
        //{
        //    var memberId = new Guid(User.ClaimValue(ClaimHelper.ClaimId));

        //    var result = await visitService.GetMemberVisit(memberId);

        //    return Ok(Mapper.Map<VisitDto>(result));
        //}
    }
}