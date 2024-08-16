using System.Security.Claims;
using GreenRoutine;
using GreenRoutine.Models;
using Microsoft.AspNetCore.Identity;

using Microsoft.AspNetCore.Mvc.ModelBinding.Binders;

using Microsoft.AspNetCore.Identity.UI.Services;

using Microsoft.EntityFrameworkCore;
using TodoApi.Server.Data;
using TodoApi.Server.Models;
using TodoApi.Server.Services;

var builder = WebApplication.CreateBuilder(args);

var connectionString = "host=localhost;user=greenroutine;password=greenroutine;database=green_routine";
builder.Services.AddDbContext<ChallengeDbContext>(options => options.UseMySql(connectionString, new MySqlServerVersion(new Version(8, 0, 36))));

builder.Services.AddAuthorization();
builder.Services.AddIdentity<ApplicationUser, IdentityRole>(options => {
    options.SignIn.RequireConfirmedAccount = false;
    options.SignIn.RequireConfirmedEmail = false;
    options.SignIn.RequireConfirmedPhoneNumber = false;
})
    .AddEntityFrameworkStores<ChallengeDbContext>()
    .AddDefaultTokenProviders()
    .AddDefaultUI();

builder.Services.AddScoped<IUserClaimsPrincipalFactory<ApplicationUser>, CustomClaimsPrincipalFactory>();

// Register the generic NoOpEmailSender
builder.Services.AddSingleton<IEmailSender>(sp => new NoOpEmailSender<ApplicationUser>());

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
    builder =>
    {
        builder.AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader();
    });
});



// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddHttpClient();



// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


// Enable detailed logging
builder.Logging.SetMinimumLevel(LogLevel.Debug);


var app = builder.Build();

app.UseAuthentication();
app.UseAuthorization();

app.UseCors("AllowAll");
app.UseDefaultFiles();
app.UseStaticFiles();


app.MapIdentityApi<ApplicationUser>();

app.MapPost("/logout", async (SignInManager<ApplicationUser> signInManager) =>
{
    await signInManager.SignOutAsync();
    return Results.Ok();
}).RequireAuthorization();

app.MapGet("/pingauth", (ClaimsPrincipal user) =>
{
    var id = user.FindFirstValue(ClaimTypes.NameIdentifier);
    var email = user.FindFirstValue(ClaimTypes.Email); //get the user's email from the claim
    var userName = user.FindFirstValue(ClaimTypes.Name);
    var firstName = user.FindFirstValue("FirstName");
    var lastName = user.FindFirstValue("LastName");
    var bio = user.FindFirstValue("Bio");
    var leaves = user.FindFirstValue("Leaves");
    var dateJoined = user.FindFirstValue("DateJoined");
    var pronouns = user.FindFirstValue("Pronouns");
    var lifetimeLeaves = user.FindFirstValue("LifetimeLeaves");
    var currentStreak = user.FindFirstValue("CurrentStreak");
    var longestStreak = user.FindFirstValue("LongestStreak");
    var numChallengesComplete = user.FindFirstValue("NumChallengesComplete");
    var numChallengesCreated = user.FindFirstValue("NumChallengesCreated");
    var profilePhoto = user.FindFirstValue("ProfilePhoto");
    var makeChoice = user.FindFirstValue("MakeChoice");
    var modelChoice = user.FindFirstValue("ModelChoice");
    var country = user.FindFirstValue("Country");
    var electricityUnit = user.FindFirstValue("ElectricityUnit");
    var makeName = user.FindFirstValue("MakeName");
    var modelName = user.FindFirstValue("ModelName");
    return Results.Json(new { 
        Id = id,
        Email = email,
        UserName = userName,
        FirstName = firstName,
        LastName = lastName,
        Bio = bio,
        Leaves = leaves,
        DateJoined = dateJoined,
        Pronouns = pronouns,
        LifetimeLeaves = lifetimeLeaves,
        CurrentStreak = currentStreak,
        LongestStreak = longestStreak,
        NumChallengesComplete = numChallengesComplete,
        NumChallengesCreated = numChallengesCreated,
        MakeChoice = makeChoice,
        ModelChoice = modelChoice,
        Country = country,
        ElectricityUnit = electricityUnit,
        ModelName = modelName,
        MakeName = makeName
    }); // return the email as a plain text response
}).RequireAuthorization();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    
}


app.UseHttpsRedirection();

app.MapControllers();

app.Run();
