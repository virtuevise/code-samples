using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace shoppingTouristsSqlApi
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                //routeTemplate: "api/{controller}/{action}/{data}",

                defaults: new { id = RouteParameter.Optional }
                //defaults: new { data = RouteParameter.Optional }
            );
        }
    }
}
