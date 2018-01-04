using System;
using System.Collections.Generic;
using Newtonsoft.Json;
using Starkman.Backend.Domain.Entities.Page;
using Starkman.Backend.Storage.Redis;

namespace Starkman.Backend.xUnitTest.WebApi
{
    public class CategoryControllerFixture : IDisposable
    {
        private const string EntityName = "Category";

        public CategoryControllerFixture()
        {
            var categoryList = new List<Category>()
            {
                new Category() { Url = "test_category_1", Title = "Тестовая категория 1", SortOrder = -1 },
                new Category() { Url = "test_category_2", Title = "Тестовая категория 2", SortOrder = -2 },
                new Category() { Url = "test_category_3", Title = "Тестовая категория 3", SortOrder = -3 },
                new Category() { Url = "test_category_4", Title = "Тестовая категория 4", SortOrder = -4 }
            };

            foreach (var category in categoryList)
            {
                RedisContext.RedisConnection.GetDatabase(0).HashSetAsync(EntityName, category.Url,
                    JsonConvert.SerializeObject(category, Formatting.None,
                        new JsonSerializerSettings() { NullValueHandling = NullValueHandling.Ignore })).Wait();
            }
        }

        public void Dispose()
        {
            RedisContext.RedisConnection.GetDatabase(0).HashDelete(EntityName, "test_category_1");
            RedisContext.RedisConnection.GetDatabase(0).HashDelete(EntityName, "test_category_2");
            RedisContext.RedisConnection.GetDatabase(0).HashDelete(EntityName, "test_category_3");
            RedisContext.RedisConnection.GetDatabase(0).HashDelete(EntityName, "test_category_4");
        }
    }
}