using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;
using StackExchange.Redis;
using Starkman.Backend.Domain.Entities.Page;
using Starkman.Backend.Storage.Redis;

namespace Starkman.Backend.Domain.Services.Redis
{
    public class RedisCategoryStorageService: IStorageService<Category>
    {
        private string _entityName = "Category";
        private int _databaseId = 0;

        public IDictionary<string, string> InitData { get; set; }

        public async Task<IEnumerable<Category>> ListAsync()
        {
            var redisHash = await RedisContext.RedisConnection.GetDatabase(_databaseId).HashValuesAsync(_entityName);

            return
                redisHash.Any()
                    ? redisHash.Select(c => JsonConvert.DeserializeObject<Category>(c)).OrderBy(c => c.SortOrder)
                    : null;
        }

        public async Task<Category> FindAsync(string key)
        {
            var redisValue = await RedisContext.RedisConnection.GetDatabase(_databaseId).HashGetAsync(_entityName, key);

            return 
                redisValue.HasValue
                    ? JsonConvert.DeserializeObject<Category>(redisValue)
                    : null;
        }

        public async Task<bool> SetAsync(Category entity)
        {
            return await RedisContext.RedisConnection.GetDatabase(_databaseId).HashSetAsync(_entityName, entity.Url,
                JsonConvert.SerializeObject(entity, Formatting.None,
                    new JsonSerializerSettings() {NullValueHandling = NullValueHandling.Ignore}));
        }

        public async Task<bool> RemoveAsync(string key)
        {
            return await RedisContext.RedisConnection.GetDatabase(_databaseId).HashDeleteAsync(_entityName, key);
        }
    }
}