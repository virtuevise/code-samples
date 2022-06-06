using Easyvat.Common.Model;
using Easyvat.Model.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Easyvat.Services.DataServices
{
    public class VisitService
    {
        private readonly EasyvatContext ctx;
        public VisitService(EasyvatContext ctx)
        {
            this.ctx = ctx;
        }

        public async Task AddVisit(VisitInfo visit)
        {
          
            var data = await ctx.Visits.FirstOrDefaultAsync(x => x.MemberId == visit.MemberId);
            var spacialOffer = await ctx.Members.FirstOrDefaultAsync(x=>x.Id == visit.MemberId);
            if (data != null&&spacialOffer!=null)
            {
                data.AreaId = string.Join(",", visit.AreaId);
                data.CityId = string.Join(",", visit.CityId);
                data.InterestId = string.Join(",", visit.InterestId);
                data.PurposeId = visit.PurposeId;
                data.EndDate = visit.EndDate;
                spacialOffer.SpecialOffers = visit.SpecialOffers;
                ctx.Visits.Update(data);
                ctx.Members.Update(spacialOffer);
            }
            else
            {
                try
                {
                    Visit newVisit = new Visit();
                    Member memberData = new Member();
                    newVisit.AreaId = string.Join(",", visit.AreaId);
                    newVisit.CityId = string.Join(",", visit.CityId);
                    newVisit.InterestId = string.Join(",", visit.InterestId);
                    newVisit.PurposeId = visit.PurposeId;
                    newVisit.EndDate = visit.EndDate;
                    newVisit.MemberId = visit.MemberId;
                    ctx.Visits.Add(newVisit);
                    if (spacialOffer == null)
                    {
                        memberData.SpecialOffers = visit.SpecialOffers;
                        ctx.Members.Add(memberData);
                    }
                    else
                    {
                        spacialOffer.SpecialOffers = visit.SpecialOffers;
                        ctx.Members.Update(spacialOffer);
                    }
                  
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
            await ctx.SaveChangesAsync();
        }

        public async Task<VisitInfo> GetMemberVisit(Guid? memberId)
        {
            VisitInfo visit = new VisitInfo();
            try
            {
                var visitData = await ctx.Visits.Where(x => x.MemberId == memberId).OrderByDescending(y => y.CreatedDateTime).FirstOrDefaultAsync();
                var memberData = await ctx.Members.Where(x => x.Id == memberId).FirstOrDefaultAsync();
                if (visitData == null)
                {
                    return null;
                }
                else
                {
                    visit.MemberId = visitData.MemberId;
                    visit.EndDate = visitData.EndDate;
                    visit.AreaId = visitData.AreaId.Split(",").Select(x => Convert.ToInt32(x)).ToArray();
                    visit.CityId = visitData.CityId.Split(",").Select(x => Convert.ToInt32(x)).ToArray();
                    visit.InterestId = visitData.InterestId.Split(",").Select(x => Convert.ToInt32(x)).ToArray();
                    visit.PurposeId = visitData.PurposeId;
                    visit.CreatedDateTime = visitData.CreatedDateTime;
                    visit.SpecialOffers = memberData.SpecialOffers;
                }
                
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return visit;
        }
    }
}
