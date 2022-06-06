//using System;
//using System.Net;
//using System.Net.Http;
//using System.Web.Http;
//using System.Configuration;
//using System.Web.Script.Serialization;
////using shoppingTouristsSqlApi.ShaamCls;


//namespace shoppingTouristsSqlApi.Controllers
//{
  
//    public class 
//        Controller : ApiController
//    {
       
//        [HttpPost]
//        //[Route("Post")]
//        [ActionName("post")]
        //public HttpResponseMessage post([FromBody]cInputData data)
        //{
        //    cOutPutData result = new cOutPutData();
        //    result = connectShaam(data);                   //שליחה לשעם
        //    if (result.rcText == string.Empty || result.rcText == "")
        //    {
        //        SaveSqlData(data);
        //    }
        //    return Request.CreateResponse(HttpStatusCode.OK, result);
        //}


        //private cOutPutData connectShaam(cInputData data)
        //{
        //    ServicePointManager.Expect100Continue = true;
        //    ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
        //    cOutPutData result = new cOutPutData();
        //    string URL = ConfigurationManager.AppSettings["urlToShaam"];
        //    HttpClient client = new HttpClient();
        //    client.BaseAddress = new Uri(URL);
        //    client.DefaultRequestHeaders.Accept.Clear();
        //    client.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));//המרת אוביקט לגיסון           
        //    var ra = new JavaScriptSerializer().Serialize(data);
        //    try
        //    {
              
        //        var response = client.PostAsJsonAsync(URL, data).Result;
        //        if (!response.IsSuccessStatusCode)  //אם החיבור לשעם נכשל
        //        {
        //            result.rc = 1;
        //            result.rcText = "connection to Shaam failed";
                 
        //        }
        //        else
        //        {
        //            var rd = response.Content.ReadAsStringAsync().Result;
        //            var getData = Newtonsoft.Json.JsonConvert.DeserializeObject<cOutPutData>(rd);
        //            result = getData;
                 
        //        }

        //    }
        //    catch(Exception e)  //אם החיבור לשעם נכשל
        //    {
        //        result.rc = 2;
        //        result.rcText = "connection to Shaam failed" + e.Message.ToString()+e.StackTrace.ToString();
               
        //    }
        //    return result;
        //}



        //private void SaveSqlData (cInputData data)
        //{

        //}

    //}
//}
