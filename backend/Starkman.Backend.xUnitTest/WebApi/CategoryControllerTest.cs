using System;
using Starkman.Backend.WebApi.Controllers;
using Xunit;

namespace xUnitTest.Postgres
{
    public class ValuesControllerTest
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
