using Starkman.Backend.Domain.Entities.Seo;
using Starkman.Backend.WebApi.Controllers;
using Xunit;

namespace Starkman.Backend.xUnitTest.WebApi
{
    public class CategoryControllerTest
    {
        [Fact]
        public async void GetEntityListTest()
        {
            CategoryController controller = new CategoryController();
            var result = await controller.Get();
            Assert.True(result != null);
        }

        [Fact]
        public async void GetEntityTest()
        {
            CategoryController controller = new CategoryController();
            var result = await controller.Get("test_category");
            Assert.True(result != null);
        }

        [Fact]
        public async void PostTest()
        {
            CategoryController controller = new CategoryController();
            var inserted = await controller.Post(new Category() { Url = "test_category", Title = "Тестовая категория", SortOrder = 1 });
            if (inserted)
            {
                Assert.True(inserted);
            }
            else
            {
                var result = await controller.Get("test_category");
                Assert.True(result != null);
            }
        }

        [Fact]
        public async void DeleteTest()
        {
            CategoryController controller = new CategoryController();
            var deleted = await controller.Delete("test_category");

            if (deleted)
            {
                Assert.True(deleted);
            }
            else
            {
                var result = await controller.Get("test_category");
                Assert.True(result == null);
            }
        }
    }
}
