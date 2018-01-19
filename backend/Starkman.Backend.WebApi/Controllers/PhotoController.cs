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

        // GET api/photo
        [HttpGet]
        public async Task<IEnumerable<Photo>> Get()
        {
            return await this._storageService.ListAsync();
        }

        // GET api/photo/5
        [HttpGet("{id}")]
        public async Task<Photo> Get(string id)
        {
            return await this._storageService.FindAsync(id);
        }

        // POST api/photo
        [HttpPost]
        public async Task<bool> Post([FromBody] Photo entity)
        {
            return await this._storageService.SetAsync(entity);
        }
        
        // DELETE api/photo/5
        [HttpDelete("{id}")]
        public async Task<bool> Delete(string id)
        {
            return await this._storageService.RemoveAsync(id);
        }

        // GET api/photo/rename?oldUrl=old.jpeg&newUrl=new.jpeg
        [Route("rename")]
        [HttpGet("{oldUrl}")]
        [HttpGet("{oldUrlType}")]
        [HttpGet("{newUrl}")]
        public async Task<bool> Get(string oldUrl, string oldUrlType, string newUrl)
        {
            var oldPhoto = await this._storageService.FindAsync($"{oldUrl}.{oldUrlType}");
            var newPhoto = oldPhoto;
                newPhoto.Url = newUrl;

            var removeResult = await this._storageService.RemoveAsync($"{oldUrl}.{oldUrlType}");
            var setResult = await this._storageService.SetAsync(newPhoto);

            return removeResult && setResult;
        }
    }
}
