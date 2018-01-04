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
                new Category() { Url = "bryuki_casual", Title = "����� Casua", SortOrder = 1 },
                new Category() { Url = "bryuki_klassika", Title = "����� ��������", SortOrder = 2 },
                new Category() { Url = "bryuki_zauzhennye", Title = "����� ���������", SortOrder = 3 },
                new Category() { Url = "bryuki_detskie", Title = "����� �������", SortOrder = 4 },

                new Category() { Url = "kostyumy_pritalennye", Title = "������� �����������", SortOrder = 5 },
                new Category() { Url = "kostyumy_detskie", Title = "������� ��� ���������", SortOrder = 6 },

                new Category() { Url = "pidzhaki_klassika", Title = "������� ��������", SortOrder = 7 },
                new Category() { Url = "pidzhaki_pritalennye", Title = "������� �����������", SortOrder = 8 }
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
