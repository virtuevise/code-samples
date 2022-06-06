using Easyvat.Common.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace Easyvat.SupplierApi
{
    //todo:change the middleware to filter for PurchaseController
    public class ErrorHandlingMiddleware
    {
        readonly RequestDelegate next;
        readonly ILogger logger;

        public ErrorHandlingMiddleware(RequestDelegate next, ILogger<ErrorHandlingMiddleware> logger)
        {
            this.next = next;
            this.logger = logger;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await next(context);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(context, ex);
            }
        }

        private Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            var code = HttpStatusCode.InternalServerError;
            var msg = "ארעה שגיאה אנא פנה למנהל מערכת";

            logger.LogError($"Exception information: {exception}");

            if (exception.InnerException != null)
            {
                logger.LogError($"Inner Exception information: {exception.InnerException}");
                exception = exception.InnerException;
            }

            if (exception is UnauthorizedAccessException) code = HttpStatusCode.Unauthorized;

            if (exception is ApplicationException || exception is InvalidOperationException)
            {
                code = HttpStatusCode.Forbidden;
                msg = exception.Message;
            }

            var response = new AppResponse
            {
                ErrorMessage = exception.Message
            };

            var result = JsonConvert.SerializeObject(response);

            context.Response.ContentType = "application/json";

            context.Response.StatusCode = (int)code;

            return context.Response.WriteAsync(result);
        }
    }
}
