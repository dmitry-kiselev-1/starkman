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
                new Category()
                {
                    Url = "bryuki_casual", Title = "����� Casual", IsVisible = true, SortOrder = 1,
                    Photo = new Photo() { Type = "jpeg", Size = 370661, Url = "bryuki_casual", IsVisible = false, IsDeleted = false },
                    ProductList = new List<Product>()
                    {
                        new Product(){
                            UrlParent = "bryuki_casual", Url = "bryuki_casual_100", Sku = 100,
                            Title = "����� ��������", Description = "����� �������� Description",
                            MetaKeywords = "����� �������� MetaKeywords", MetaDescription = "����� �������� MetaDescription",
                            IsVisible = true, SortOrder = 2, IsDeleted = false,
                            PhotoList = new List<Photo>()
                            {
                                new Photo() { Type = "jpeg", Size = 370661, Url = "bryuki_casual_100_v1", IsVisible = true, IsDeleted = false },
                                new Photo() { Type = "jpeg", Size = 370661, Url = "bryuki_casual_100_v2", IsVisible = true, IsDeleted = false },
                                new Photo() { Type = "jpeg", Size = 370661, Url = "bryuki_casual_100_v3", IsVisible = true, IsDeleted = false }
                            }
                        },
                        new Product(){
                            UrlParent = "kostyumy_detskie", Url = "kostyumy_detskie_200", Sku = 200,
                            Title = "������� ��� ���������", Description = "������� ��� ��������� Description",
                            MetaKeywords = "������� ��� ��������� MetaKeywords", MetaDescription = "������� ��� ��������� MetaDescription",
                            IsVisible = true, SortOrder = 2, IsDeleted = false,
                            PhotoList = new List<Photo>()
                            {
                                new Photo() { Type = "jpeg", Size = 370661, Url = "kostyumy_detskie_200_v1", IsVisible = true, IsDeleted = false },
                                new Photo() { Type = "jpeg", Size = 370661, Url = "kostyumy_detskie_200_v2", IsVisible = true, IsDeleted = false },
                                new Photo() { Type = "jpeg", Size = 370661, Url = "kostyumy_detskie_200_v3", IsVisible = true, IsDeleted = false }
                            }
                        }

                    }
                },

                new Category() { Url = "bryuki_klassika", Title = "����� ��������", IsVisible = true, SortOrder = 2 },
                new Category() { Url = "bryuki_zauzhennye", Title = "����� ���������", IsVisible = true, SortOrder = 3 },
                new Category() { Url = "bryuki_detskie", Title = "����� �������", IsVisible = true, SortOrder = 4 },

                new Category() { Url = "kostyumy_pritalennye", Title = "������� �����������", IsVisible = true, SortOrder = 5 },
                new Category() { Url = "kostyumy_detskie", Title = "������� ��� ���������", IsVisible = true, SortOrder = 6 },

                new Category() { Url = "pidzhaki_klassika", Title = "������� ��������", IsVisible = true, SortOrder = 7 },
                new Category() { Url = "pidzhaki_pritalennye", Title = "������� �����������", IsVisible = true, SortOrder = 8 }
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
