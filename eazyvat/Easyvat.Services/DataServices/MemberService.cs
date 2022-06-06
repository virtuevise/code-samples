using Easyvat.Model.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;


namespace Easyvat.Services.DataServices
{
    public class MemberService
    {
        private readonly EasyvatContext ctx;
        public MemberService(EasyvatContext ctx)
        {
            this.ctx = ctx;
        }

        public async Task<List<Member>> GetMembers()
        {
            return await ctx.Members.ToListAsync();
        }

        public async Task<Member> GetMemberById(Guid? memberId)
        {
            return await ctx.Members.FindAsync(memberId);
        }
        //public IActionResult getVisitMemberById(Guid? memberId)
        //{
        //    bool result= ctx.Visits.Any(x=>x.MemberId== memberId);
        //    return result;
        //}
        //public async Task<Visit> getVisitMemberById(Guid? memberId)
        //{
        //    return await ctx.Visits.FindAsync(memberId);
        //}

        public async Task<Member> AddMember(Member member)
        {
            ctx.Members.Add(member);

            await ctx.SaveChangesAsync();

            return member;
        }

        public async Task UpdateMember(Member member)
        {
            ctx.Members.Update(member);

            await ctx.SaveChangesAsync();

        }

        public async Task<Passport> GetMemberProfile(Guid? passportId)
        {
            return await ctx.Passports.Include(m => m.Member).SingleOrDefaultAsync(x => x.Id == passportId);
        }

    }
}
