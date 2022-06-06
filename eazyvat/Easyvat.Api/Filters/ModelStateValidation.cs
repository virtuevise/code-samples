using Easyvat.Common.Abstract;
using Easyvat.Common.Resources;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace Easyvat.Api.Filters
{
    public class ValidationResultModel : ServiceResult
    {
        public ValidationResultModel(ModelStateDictionary modelState)
        {
            var ValidationResult = modelState.FirstOrDefault();

            var errorCode = ValidationResult.Value.Errors.FirstOrDefault().ErrorMessage;

            if (int.TryParse(errorCode, out int errCode))
            {
                ErrorCode = errCode;
            }
            else
            {
                var index = ValidationResult.Key.IndexOf('.');
                string key;

                if (index > 0)
                {
                    key = ValidationResult.Key.Substring(index + 1);
                }
                else
                {
                    key = ValidationResult.Key;
                }

                errorCode = ValidationTypeError.ResourceManager.GetString(key);

                if (int.TryParse(errorCode, out errCode))
                {
                    ErrorCode = errCode;
                }

            }

            ErrorMessage = ValidationErrorMessage.ResourceManager.GetString($"_{errorCode}");
        }
    }

    public class ValidationFailedResult : ObjectResult
    {
        public ValidationFailedResult(ModelStateDictionary modelState)
            : base(new ValidationResultModel(modelState))
        {
            StatusCode = StatusCodes.Status200OK;
        }
    }

    public class ModelStateValidationAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            if (!context.ModelState.IsValid)
            {
                context.Result = new ValidationFailedResult(context.ModelState);
            }
        }
    }
}
