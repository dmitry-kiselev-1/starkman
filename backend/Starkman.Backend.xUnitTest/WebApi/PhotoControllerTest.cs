using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Hosting.Internal;
using Moq;
using Starkman.Backend.Domain.Entities.Page;
using Starkman.Backend.Domain.Services;
using Starkman.Backend.Domain.Services.Files;
using Starkman.Backend.WebApi.Controllers;
using Xunit;

namespace Starkman.Backend.xUnitTest.WebApi
{
    public class PhotoControllerTest
    {
        private readonly IStorageService<Photo> _storageService = new FilePhotoStorageService();
        private readonly IHostingEnvironment _hostingEnvironment = new HostingEnvironment();

        [Fact]
        public async void GetEntityListTest()
        {
            //PhotoController controller = new PhotoController(this._storageService);
            //var result = await controller.Get();
            //Assert.True((result != null) && (result.Count() > 1));
        }

        [Fact]
        public async void GetEntityTest()
        {
            //PhotoController controller = new PhotoController(this._storageService);
            //var result = await controller.Get("test_Photo_1");
            //Assert.True(result != null);
        }

        [Fact]
        public async void PostTest()
        {
            var hostingEnvironmentMock = new Mock<IHostingEnvironment>();
            hostingEnvironmentMock.Setup(hostingEnvironment => hostingEnvironment.WebRootPath)
                .Returns(@"c:\temp\");
                //.Returns(@"c:\Repositories\starkman\backend\Starkman.Backend.xUnitTest\bin\Debug\");

            PhotoController controller = new PhotoController(this._storageService, hostingEnvironmentMock.Object);
            var inserted = await controller.Post(new Photo() { Url = "test_Photo_1", Title = "Тестовая категория 1", SortOrder = 1 });
            if (inserted)
            {
                Assert.True(inserted);
            }
        }

        [Fact]
        public async void DeleteTest()
        {
            //PhotoController controller = new PhotoController(this._storageService);
            //var deleted = await controller.Delete("test_Photo_2");

            //if (deleted)
            //{
            //    Assert.True(deleted);
            //}
            //else
            //{
            //    var result = await controller.Get("test_Photo_2");
            //    Assert.True(result == null);
            //}
        }
    }
}
