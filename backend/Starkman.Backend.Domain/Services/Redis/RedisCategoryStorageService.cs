using System.Collections.Generic;
using System.Threading.Tasks;
using Starkman.Backend.Domain.Entities.Seo;

namespace Starkman.Backend.Domain.Services.Redis
{
    public class RedisCategoryStorageService: IStorageService<Category>
    {
        public async Task<IEnumerable<Category>> ListAsync()
        {
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