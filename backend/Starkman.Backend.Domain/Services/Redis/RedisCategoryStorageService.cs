using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Starkman.Backend.Domain.Entities.Seo;
using Newtonsoft.Json;
using Storage.Redis;

namespace Starkman.Backend.Domain.Services.Redis
{
    public class RedisCategoryStorageService: IStorageService<Category>
    {
        private const string EntityName = "Category";

        public async Task<IEnumerable<Category>> ListAsync()
        {
            var redisHash = await RedisContext.RedisConnection.GetDatabase(0).HashValuesAsync(EntityName);

            return
                redisHash.Any()
                    ? redisHash.Select(c => JsonConvert.DeserializeObject<Category>(c))
                    : null;
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