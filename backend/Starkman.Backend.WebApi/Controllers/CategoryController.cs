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
        // GET api/сategory
        [HttpGet]
        public async Task<IEnumerable<Category>> Get()
        {
            IStorageService<Category> service = new RedisCategoryStorageService();
            return await service.ListAsync();
        }

        // GET api/сategory/5
        [HttpGet("{id}")]
        public async Task<Category> Get(string id)
        {
            IStorageService<Category> service = new RedisCategoryStorageService();
            return await service.FindAsync(id);
        }

        // POST api/сategory
        [HttpPost]
        public async void Post([FromBody] Category entity)
        {
            IStorageService<Category> service = new RedisCategoryStorageService();
            await service.SetAsync(entity);
        }


        // DELETE api/сategory/5
        [HttpDelete("{id}")]
        public async void Delete(string id)
        {
            IStorageService<Category> service = new RedisCategoryStorageService();
            await service.RemoveAsync(id);
        }

    }
}
