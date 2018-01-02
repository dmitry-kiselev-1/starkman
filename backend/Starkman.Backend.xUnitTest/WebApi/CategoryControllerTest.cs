using Starkman.Backend.WebApi.Controllers;
using Xunit;

namespace Starkman.Backend.xUnitTest.WebApi
{
    public class CategoryControllerTest
    {
        [Fact]
        public async void GetTest()
        {
            CategoryController controller = new CategoryController();
            var result = await controller.Get();
            Assert.True(result != null);
        }
    }
}
