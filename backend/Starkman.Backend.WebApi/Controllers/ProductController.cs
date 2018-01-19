using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Starkman.Backend.Domain.Entities.Page;
using Starkman.Backend.Domain.Services;
using Starkman.Backend.Domain.Services.Redis;

namespace Starkman.Backend.WebApi.Controllers
{
    [Route("api/[controller]")]
    public class ProductController : Controller
    {
        private readonly IStorageService<Product> _storageService;

        /// <summary>
        /// Dependency injection from Startup.cs -> void ConfigureServices
        /// </summary>
        public ProductController(IStorageService<Product> storageService)
        {
            this._storageService = storageService;
        }

        // GET api/product
        [HttpGet]
        public async Task<IEnumerable<Product>> Get()
        {
            return await this._storageService.ListAsync();
        }

        // GET api/product/5
        [HttpGet("{id}")]
        public async Task<Product> Get(string id)
        {
            return await this._storageService.FindAsync(id);
        }
        
        // POST api/product
        [HttpPost]
        public async Task<bool> Post([FromBody] Product entity)
        {
            return await this._storageService.SetAsync(entity);
        }
        
        // DELETE api/product/5
        [HttpDelete("{id}")]
        public async Task<bool> Delete(string id)
        {
            return await this._storageService.RemoveAsync(id);
        }

    }
}
