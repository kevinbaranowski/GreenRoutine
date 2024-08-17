using System;
using System.ComponentModel;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace GreenRoutine.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TestController : ControllerBase
{
    private readonly HttpClient _httpClient;

    public Guid _makeChoice;
        private readonly ChallengeDbContext context;

    public TestController(ChallengeDbContext dbContext)
    {
        context = dbContext;
    }

    //Get /api/test for models
    [HttpGet("GetModels")]
    public async Task<ActionResult<VehicleModels>> GetModels()
    {
        using (var httpClient = new HttpClient())
        {
        string apiUrl = "https://www.carboninterface.com/api/v1/vehicle_makes/" + _makeChoice.ToString() + "/vehicle_models";
        var request = new HttpRequestMessage(HttpMethod.Get, apiUrl);

        // Add headers to the request
        request.Headers.Add("Authorization", "Bearer z0UbMhCEGZ0XtyG5S4pLA");
        try
        {
            HttpResponseMessage response = await httpClient.SendAsync(request);

            if (response.IsSuccessStatusCode)
            {
                string json = await response.Content.ReadAsStringAsync();
                List<VehicleModels> data = JsonConvert.DeserializeObject<List<VehicleModels>>(json);
                return Ok(data);
            }
            else
            {
                return StatusCode(
                    (int)response.StatusCode,
                    "Error fetching data from external API"
                );
            }
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
        }
    }

    //Get /api/test for makes
    [HttpGet("GetMakes")]
    public async Task<ActionResult<VehicleMakes>> GetMakes()
    {
        using (var httpClient = new HttpClient())
        {
        string apiUrl = "https://www.carboninterface.com/api/v1/vehicle_makes";
        var request = new HttpRequestMessage(HttpMethod.Get, apiUrl);

        // Add headers to the request
        request.Headers.Add("Authorization", "Bearer z0UbMhCEGZ0XtyG5S4pLA");
        try
        {
            HttpResponseMessage response = await httpClient.SendAsync(request);

            if (response.IsSuccessStatusCode)
            {
                string json = await response.Content.ReadAsStringAsync();
                List<VehicleMakes> data = JsonConvert.DeserializeObject<List<VehicleMakes>>(json);
                var sortedData = data.OrderBy(vm => vm.Data.Attributes.Name).ToList();
                return Ok(sortedData);
            }
            else
            {
                return StatusCode(
                    (int)response.StatusCode,
                    "Error fetching data from external API"
                );
            }
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
        }
    }
        public class AddMakeRequest
        {
            public Guid makeChoice { get; set; }
        }

    [HttpPost("electricity")]
    public async Task<ActionResult<ElectricityModel>> Post()
    {
        string url = "https://www.carboninterface.com/api/v1/estimates";
        Console.WriteLine(url);
        var headers = new Dictionary<string, string>
        {
            { "Authorization", "Bearer z0UbMhCEGZ0XtyG5S4pLA" },
            { "Accept", "application/json" }
        };

        string jsonBody =
            "{\"type\":\"electricity\", \"electricity_unit\":\"mwh\", \"electricity_value\":42, \"country\":\"us\", \"state\":\"fl\"}";

        Console.WriteLine("made it1");
        using (var httpClient = new HttpClient())
        {
            foreach (var header in headers)
            {
                httpClient.DefaultRequestHeaders.Add(header.Key, header.Value);
            }
            var content = new StringContent(jsonBody, Encoding.UTF8, "application/json");
            try
            {
                Console.WriteLine("made it2");
                HttpResponseMessage response = await httpClient.PostAsync(url, content);
                if (response.IsSuccessStatusCode)
                {
                    Console.WriteLine("made it3");
                    string responseBody = await response.Content.ReadAsStringAsync();
                    Console.WriteLine(responseBody);

                    var data = JsonConvert.DeserializeObject<ElectricityModel>(responseBody);

                    Console.WriteLine(data);
                    Console.WriteLine(data.Data.Id);
                    return Ok(data);
                }
            }
            catch (HttpRequestException e)
            {
                return StatusCode(500, $"Internal server error: {e.Message}");
            }
        }
        return StatusCode(500, $"Internal server error: ");
    }
}
