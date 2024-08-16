 using System.ComponentModel.DataAnnotations;

namespace TodoApi.Server.Models
{
 public class AddMakeRequest
        {
            public Guid makeChoice { get; set; }
            public string MakeName { get; set; }
            public string Id { get; set;}
        }
}