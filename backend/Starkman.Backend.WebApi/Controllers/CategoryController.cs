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
        // GET api/admin
        [HttpGet]
        public async Task<IEnumerable<Category>> GetAsync()
        {
            IStorageService<Category> service = new RedisProductStorageService();
            var entityList = await service.ListAsync();
            return entityList;
        }

        // GET api/admin/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/admin
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/admin/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/admin/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }

        /*
        public async Task<IEnumerable<Apartment>> GetApartments()
        {
            using (PostgresContext db = new PostgresContext())
            {
                // создаем два объекта User
                Building building1 = new Building() {Address = "Адрес1", Id = db.Building.Count() + 1};
                Building building2 = new Building() { Address = "Адрес2", Id = db.Building.Count() + 2 };

                // добавляем их в бд
                await db.Building.AddAsync(building1);
                await db.Building.AddAsync(building2);

                await db.SaveChangesAsync();
            }

            return await Task.Run(() =>
            {
                using (PostgresContext db = new PostgresContext())
                {
                    return db.Apartment.ToList();
                }
            });
        }
        */
    }
}
