using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web.Http;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json.Serialization;

namespace Pirl.MicroCredentials
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            var json = config.Formatters.JsonFormatter;
            json.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
            json.SerializerSettings.Converters.Add(new IsoDateTimeConverter() { DateTimeFormat = "yyyy-MM-dd" });
            config.Formatters.Remove(config.Formatters.XmlFormatter);

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
