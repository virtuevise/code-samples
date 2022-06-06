using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text;

namespace Easyvat.Common.Helpers
{
    public static class ClaimHelper
    {
        public const string ClaimId = "ClaimId";

        public static string ClaimValue(this ClaimsPrincipal claimsPrincipal, string claimType)
        {
            if (claimsPrincipal.HasClaim(x => x.Type == claimType))
            {
                return claimsPrincipal.FindFirst(claimType).Value;
            }

            throw new UnauthorizedAccessException();
        }
    }
}
