using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Moq;
using Starkman.Backend.Domain.Entities.Page;
using Starkman.Backend.Domain.Services;
using Starkman.Backend.Domain.Services.Redis;
using Starkman.Backend.WebApi.Controllers;
using Xunit;

namespace Starkman.Backend.xUnitTest.WebApi
{
    public class CategoryControllerTest : IClassFixture<CategoryControllerFixture>
    {
        private CategoryControllerFixture _fixture;

        public CategoryControllerTest(CategoryControllerFixture fixture)
        {
            this._fixture = fixture;
        }

        private readonly IStorageService<Category> _storageService = new RedisCategoryStorageService();
        
        [Fact]
        public async void GetEntityListTest()
        {
            // Mock instead service:
            /*
                var mock = new Mock<IStorageService<Category>>();
                mock.Setup(storageService => storageService.ListAsync())
                    .Returns(Task.Run<IEnumerable<Category>>(() => new List<Category>()
                    {
                        new Category() {Url = "mock_test_category_1", Title = "mock Тестовая категория 1", SortOrder = 1},
                        new Category() {Url = "mock_test_category_2", Title = "mock Тестовая категория 2", SortOrder = 2}
                    }));
                CategoryController controller = new CategoryController(mock.Object);
            */

            CategoryController controller = new CategoryController(this._storageService);
            var result = await controller.Get();
            Assert.True((result != null) && (result.Count() > 1));
        }

        [Fact]
        public async void GetEntityTest()
        {
            CategoryController controller = new CategoryController(this._storageService);
            var result = await controller.Get("test_category_1");
            Assert.True(result != null);
        }

        [Fact]
        public async void PostTest()
        {
            CategoryController controller = new CategoryController(this._storageService);
            var inserted = await controller.Post(new Category() { Url = "test_category_4", Title = "Тестовая категория 4", SortOrder = -4 });
            if (inserted)
            {
                Assert.True(inserted);
            }
            else
            {
                var result = await controller.Get("test_category_4");
                Assert.True((result != null) && (result.Title == "Тестовая категория 4"));
            }
        }

        [Fact]
        public async void DeleteTest()
        {
            CategoryController controller = new CategoryController(this._storageService);
            var deleted = await controller.Delete("test_category_2");

            if (deleted)
            {
                Assert.True(deleted);
            }
            else
            {
                var result = await controller.Get("test_category_2");
                Assert.True(result == null);
            }
        }
    }
}
