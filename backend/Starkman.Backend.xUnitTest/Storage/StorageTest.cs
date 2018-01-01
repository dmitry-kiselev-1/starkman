using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;
using StackExchange.Redis;
using Starkman.Backend.Domain.Entities.Seo;
using Starkman.Backend.WebApi.Controllers;
using Storage.Redis;
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
                new Category()
                {
                    Url = "pidzhaki_klassika",
                    Title = "Пиджаки классика",
                    SortOrder = 1
                },
                new Category()
                {
                    Url = "pidzhaki_pritalennye",
                    Title = "Пиджаки приталенные",
                    SortOrder = 2
                }
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
