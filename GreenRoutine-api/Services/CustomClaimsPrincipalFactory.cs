using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using System.Security.Claims;
using System.Threading.Tasks;
using TodoApi.Server.Data;

namespace TodoApi.Server.Services // Ensure this namespace is correct
{
    public class CustomClaimsPrincipalFactory : UserClaimsPrincipalFactory<ApplicationUser, IdentityRole>
    {
        public CustomClaimsPrincipalFactory(
            UserManager<ApplicationUser> userManager,
            RoleManager<IdentityRole> roleManager,
            IOptions<IdentityOptions> optionsAccessor)
            : base(userManager, roleManager, optionsAccessor)
        {
        }

        protected override async Task<ClaimsIdentity> GenerateClaimsAsync(ApplicationUser user)
        {
            var identity = await base.GenerateClaimsAsync(user);

            // Add custom claims
            if (!string.IsNullOrEmpty(user.FirstName))
            {
                identity.AddClaim(new Claim("FirstName", user.FirstName));
            }
            if (!string.IsNullOrEmpty(user.LastName))
            {
                identity.AddClaim(new Claim("LastName", user.LastName));
            }
            if (!string.IsNullOrEmpty(user.Bio))
            {
                identity.AddClaim(new Claim("Bio", user.Bio));
            }
            if (!string.IsNullOrEmpty(user.Pronouns)) 
            {
                identity.AddClaim(new Claim("Pronouns", user.Pronouns));
            }
            if (!string.IsNullOrEmpty(user.Country))
            {
                identity.AddClaim(new Claim("Country", user.Country));
            }
            if (!string.IsNullOrEmpty(user.ElectricityUnit))
            {
                identity.AddClaim(new Claim("ElectricityUnit", user.ElectricityUnit));
            }
            if (!string.IsNullOrEmpty(user.MakeName))
            {
                identity.AddClaim(new Claim("MakeName", user.MakeName));
            }
            if (!string.IsNullOrEmpty(user.ModelName))
            {
                identity.AddClaim(new Claim("ModelName", user.ModelName));
            }
            identity.AddClaim(new Claim("Leaves", user.Leaves.ToString()));
            identity.AddClaim(new Claim("DateJoined", user.DateJoined.ToString()));
            identity.AddClaim(new Claim("LifetimeLeaves", user.LifetimeLeaves.ToString()));
            identity.AddClaim(new Claim("CurrentStreak", user.CurrentStreak.ToString()));
            identity.AddClaim(new Claim("LongestStreak", user.LongestStreak.ToString()));
            identity.AddClaim(new Claim("NumChallengesComplete", user.NumChallengesComplete.ToString()));
            identity.AddClaim(new Claim("NumChallengesCreated", user.NumChallengesCreated.ToString()));
            identity.AddClaim(new Claim("MakeChoice", user.makeChoice.ToString()));
            identity.AddClaim(new Claim("ModelChoice", user.modelChoice.ToString()));

            return identity;
        }
    }
}
