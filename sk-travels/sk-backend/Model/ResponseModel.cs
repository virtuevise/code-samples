using System.Net;

namespace sk_travel.Model
{
    public class ResponseModel
    {
        public HttpStatusCode StatusCode { get; set; }
        public string? Message { get; set; }
        public string Role { get; set; }
        public string Token { get; set; }
        public dynamic? Data { get; set; }

    }
}
