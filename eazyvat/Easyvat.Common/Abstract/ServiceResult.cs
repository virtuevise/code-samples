using Newtonsoft.Json;

namespace Easyvat.Common.Abstract
{
    public abstract class ServiceResult
    {
        [JsonProperty("rc")]
        public int ErrorCode { get; set; }
        [JsonProperty("rcText")]
        public string ErrorMessage { get; set; }
        [JsonProperty("OutStrPdf")]
        public string OutStrPdf { get; set; }
    }
}
