using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;
using StackExchange.Redis;
using Starkman.Backend.Domain.Entities.Page;
using Starkman.Backend.Storage.Redis;

namespace Starkman.Backend.Domain.Services.Redis
{
    public class RedisProductStorageService : IStorageService<Product>
    {
        private string _entityName = "Product";
        private int _databaseId = 1;

        public IDictionary<string, string> InitData { get; set; }

        private const string EntityName = "Product";
        public async Task<IEnumerable<Product>> ListAsync()
        {
            throw new System.NotImplementedException();
        }

        public async Task<Product> FindAsync(string key)
        {
            throw new System.NotImplementedException();
        }

        public async Task<bool> SetAsync(Product entity)
        {
            throw new System.NotImplementedException();
        }

        public async Task<bool> RemoveAsync(string key)
        {
            throw new System.NotImplementedException();
        }
    }
}