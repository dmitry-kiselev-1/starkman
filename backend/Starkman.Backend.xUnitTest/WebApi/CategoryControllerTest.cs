using Starkman.Backend.WebApi.Controllers;
using Xunit;

namespace Starkman.Backend.xUnitTest.WebApi
{
    public class CategoryControllerTest
    {
        [Fact]
        public async void GetEntityAsyncPostgrisTest()
        {
            CategoryController controller = new CategoryController();
            var result = await controller.GetAsync();
            Assert.True(result != null);
        }
    }
}
