using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Easyvat.Common.Config;
using Easyvat.Common.Helpers;
using Easyvat.Services.DataServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Easyvat.Api.Controllers
{
    [Produces("application/json")]
    [Route("[controller]")]
    public class FileController : ControllerBase
    {
        private readonly ILogger logger;
        readonly AzureStorageConfig azureStorageConfig;
        readonly LocalStorageConfiguration localStorageConfig;
        private readonly IHostingEnvironment env;
        private readonly PurchaseService PurchaseService;
        public FileController(PurchaseService PurchaseService, AzureStorageConfig azureStorageConfig, LocalStorageConfiguration localStorageConfig, ILogger<FileController> logger, IHostingEnvironment env)
        {
            this.PurchaseService = PurchaseService;
            this.localStorageConfig = localStorageConfig;
            this.azureStorageConfig = azureStorageConfig;
            this.logger = logger;
            this.env = env;
        }

        [HttpPost("upload")]
        public async Task<ActionResult<string>> Upload(IFormFile file)
        {
            string result = string.Empty;

            var fileName = string.Format("{0}{1}", Guid.NewGuid().ToString(), Path.GetExtension(file.FileName));

            if (file.Length <= 0)
            {
                return BadRequest();
            }

            var uri = await StorageHelper.UploadFileToStorage(file.OpenReadStream(), fileName, azureStorageConfig);

            result = uri.AbsoluteUri;

            return Ok(result);

        }

        [HttpGet("download/{id}")]
        public async Task<IActionResult> DownloadPdfResult(string id)
        {

            if (!Guid.TryParse(id, out Guid purchaseId))
            {
                return BadRequest();
            }

            var purchase = await PurchaseService.GetPurchase(purchaseId);

            byte[] decodedBytes = Convert.FromBase64String(purchase.ReferencePdf);

            return File(decodedBytes, "application/pdf");

        }

    }
}