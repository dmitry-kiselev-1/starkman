using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;
using StackExchange.Redis;
using Starkman.Backend.Domain.Entities.Page;
using Starkman.Backend.Storage.Redis;
using Starkman.Backend.WebApi.Controllers;
using Xunit;

namespace Starkman.Backend.xUnitTest.Storage
{
    public class StorageTest
    {
        private const string EntityName = "Category";

        [Fact]
        public async void StorageInitTest()
        {
            var categoryList = new List<Category>()
            {
                new Category() { Url = "bryuki_casual", Title = "Брюки Casua", SortOrder = 1 },
                new Category() { Url = "bryuki_klassika", Title = "Брюки классика", SortOrder = 2 },
                new Category() { Url = "bryuki_zauzhennye", Title = "Брюки зауженные", SortOrder = 3 },
                new Category() { Url = "bryuki_detskie", Title = "Брюки детские", SortOrder = 4 },

                new Category() { Url = "kostyumy_pritalennye", Title = "Костюмы приталенные", SortOrder = 5 },
                new Category() { Url = "kostyumy_detskie", Title = "Костюмы для мальчиков", SortOrder = 6 },

                new Category() { Url = "pidzhaki_klassika", Title = "Пиджаки классика", SortOrder = 7 },
                new Category() { Url = "pidzhaki_pritalennye", Title = "Пиджаки приталенные", SortOrder = 8 }
            };

            foreach (var category in categoryList)
            {
                await RedisContext.RedisConnection.GetDatabase(0).HashSetAsync(EntityName, category.Url,
                    JsonConvert.SerializeObject(category, Formatting.None,
                        new JsonSerializerSettings() {NullValueHandling = NullValueHandling.Ignore}));
            }

            var keyExists = await RedisContext.RedisConnection.GetDatabase(0).KeyExistsAsync(EntityName);

            Assert.True(keyExists);
        }

    }
}
