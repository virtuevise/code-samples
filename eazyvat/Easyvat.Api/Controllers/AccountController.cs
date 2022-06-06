using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Easyvat.Api.ViewModel;
using Easyvat.Common.Config;
using Easyvat.Common.Helper;
using Easyvat.Common.Helpers;
using Easyvat.Model.Models;
using Easyvat.Services.DataServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Easyvat.Api.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly MemberService memberService;
        private readonly PassportService passportService;
        private readonly AccountService accountService;
        private readonly PurchaseService purchaseService;
        readonly AzureStorageConfig azureStorageConfig;
        private readonly IMapper Mapper;
        private readonly IHostingEnvironment env;
        public AccountController(PassportService passportService, MemberService memberService, AccountService accountService, PurchaseService purchaseService, AzureStorageConfig azureStorageConfig, IMapper Mapper, IHostingEnvironment env)
        {
            this.memberService = memberService;
            this.passportService = passportService;
            this.accountService = accountService;
            this.purchaseService = purchaseService;
            this.azureStorageConfig = azureStorageConfig;
            this.Mapper = Mapper;
            this.env = env;
        }

        [HttpPost("scan")]
        public async Task<ActionResult<string>> ScanPassport(PassportDetailsDto passportDetails)
        {
            Member member;

            var passport = passportService.GetPassportByKeys(passportDetails.PassportNumber,passportDetails.Nationality);

            var personFaceImage = string.Empty;// await ImageProccessHelper.CropFaceFromImage(passportDetails.ImagePassport, azureStorageConfig);

            if (passport == null || passport.MemberId.ToString().ToUpper() == Constants.SystemUserId)
            {
                member = await memberService.AddMember(new Member());
            }
            else
            {
                member = await memberService.GetMemberById(passport.MemberId);
            }

            if (passport == null)//The member don't have a purchases yet.
            {
                passport = Mapper.Map<Passport>(passportDetails);

                passport.MemberId = member.Id;

                passport.ImageMember = personFaceImage;

                await passportService.AddPassport(passport);
            }
            else if (passport.MemberId.ToString().ToUpper() == Constants.SystemUserId)//First entry of the memebr to the application.
            {
                passportDetails.Id = passport.Id;

                passport = Mapper.Map<Passport>(passportDetails);

                passport.MemberId = member.Id;

                passport.ImageMember = personFaceImage;

                await passportService.UpdatePassport(passport);

                await purchaseService.UpdateMemberPurchases(passport);
            }
            else//Another scan of exist member.
            {
                passportDetails.Id = passport.Id;

                passport = Mapper.Map<Passport>(passportDetails);

                passport.MemberId = member.Id;

                passport.ImageMember = personFaceImage;

                await passportService.UpdatePassport(passport);
            }

            var token = accountService.CreateToken(member);

            return Ok(new TokenResponse() { Token = token });
        }

        [HttpGet("member")]
        [Authorize]
        public async Task<ActionResult<AccountDetailsDto>> GetAccountProfile()
        {
            var memberId = new Guid(User.ClaimValue(ClaimHelper.ClaimId));

            var passport = await passportService.GetMemberPassport(memberId);

            var account = await memberService.GetMemberProfile(passport?.Id);

            var result = Mapper.Map<AccountDetailsDto>(account);

            return Ok(result);

        }

    }
}