using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Starkman.Backend.Domain.Entities.Page;
using Starkman.Backend.Domain.Services;
using Starkman.Backend.Domain.Services.Redis;

namespace Starkman.Backend.WebApi.Controllers
{
    [Route("api/[controller]")]
    public class PhotoController : Controller
    {
        private readonly IStorageService<Photo> _storageService;
        private readonly IHostingEnvironment _hostingEnvironment;

        /// <summary>
        /// Dependency injection from Startup.cs -> void ConfigureServices
        /// </summary>
        public PhotoController(
            IStorageService<Photo> storageService, 
            IHostingEnvironment hostingEnvironment)
        {
            this._storageService = storageService;
            this._hostingEnvironment = hostingEnvironment;

            var webRootPath = this._hostingEnvironment.WebRootPath;
            this._storageService.InitData = new Dictionary<string, string> {{"WebRootPath", webRootPath}};
        }

        // GET api/сategory
        [HttpGet]
        public async Task<IEnumerable<Photo>> Get()
        {
            return await this._storageService.ListAsync();
        }

        // GET api/сategory/5
        [HttpGet("{id}")]
        public async Task<Photo> Get(string id)
        {
            return await this._storageService.FindAsync(id);
        }
        
        // POST api/сategory
        [HttpPost]
        public async Task<bool> Post([FromBody] Photo entity)
        {
            return await this._storageService.SetAsync(entity);
        }


        // DELETE api/сategory/5
        [HttpDelete("{id}")]
        public async Task<bool> Delete(string id)
        {
            return await this._storageService.RemoveAsync(id);
        }

    }
}
