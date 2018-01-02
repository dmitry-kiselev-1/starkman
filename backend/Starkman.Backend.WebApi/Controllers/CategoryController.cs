using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Starkman.Backend.Domain.Entities.Seo;
using Starkman.Backend.Domain.Services;
using Starkman.Backend.Domain.Services.Redis;

namespace Starkman.Backend.WebApi.Controllers
{
    [Route("api/[controller]")]
    public class CategoryController : Controller
    {
        private readonly IStorageService<Category> _storageService;

        /// <summary>
        /// Dependency injection from Startup.cs -> void ConfigureServices
        /// </summary>
        public CategoryController(IStorageService<Category> storageService)
        {
            this._storageService = storageService;
        }

        // GET api/сategory
        [HttpGet]
        public async Task<IEnumerable<Category>> Get()
        {
            return await this._storageService.ListAsync();
        }

        // GET api/сategory/5
        [HttpGet("{id}")]
        public async Task<Category> Get(string id)
        {
            return await this._storageService.FindAsync(id);
        }

        // POST api/сategory
        [HttpPost]
        public async Task<bool> Post([FromBody] Category entity)
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
