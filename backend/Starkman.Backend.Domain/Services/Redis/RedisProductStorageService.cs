using System.Collections.Generic;
using System.Threading.Tasks;
using Starkman.Backend.Domain.Entities.Seo;
using Storage.Redis;

namespace Starkman.Backend.Domain.Services.Redis
{
    public class RedisProductStorageService : IStorageService<Category>
    {
        public async Task<IEnumerable<Category>> ListAsync()
        {
            var entityList = await RedisContext.RedisConnection.GetDatabase(0).HashGetAllAsync("Category");

            //entityList[0].Name
            //entityList[0].Value

            //ToDo: преобразовать через json-сериализатор в IEnumerable<Category>

            throw new System.NotImplementedException();
        }

        public async Task<Category> FindAsync(string key)
        {
            throw new System.NotImplementedException();
        }

        public void AddAsync(Category entity)
        {
            throw new System.NotImplementedException();
        }

        public void RemoveAsync(string key)
        {
            throw new System.NotImplementedException();
        }
    }
}