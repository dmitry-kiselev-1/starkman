using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Threading;
using System.Threading.Tasks;
using Starkman.Backend.Domain.Entities.Page;
using Starkman.Backend.Storage.Files;

namespace Starkman.Backend.Domain.Services.Files
{
    public class FilePhotoStorageService : IStorageService<Photo>
    {
        public IDictionary<string, string> InitData { get; set; } = new Dictionary<string, string>();

        public async Task<IEnumerable<Photo>> ListAsync()
        {
            return await new Task<IEnumerable<Photo>>(() => new List<Photo>());
        }

        public async Task<Photo> FindAsync(string key)
        {
            return await new Task<Photo>(() => new Photo());
        }

        public async Task<bool> SetAsync(Photo entity)
        {
            var filesDirectoryPath = FilesContext.FilesDirectoryPath;
            this.InitData.TryGetValue("WebRootPath", out var webRootPath);
            var fullPath = System.IO.Path.Combine(webRootPath, filesDirectoryPath, entity.Url);

            if (String.IsNullOrWhiteSpace(fullPath))
            {
                return await new Task<bool>(() => false);
            }
            else
            {
                await System.IO.File.WriteAllBytesAsync(fullPath, Convert.FromBase64String(entity.Base64String) ?? new Byte[0], CancellationToken.None);
                return true;
            }
        }

        public async Task<bool> RemoveAsync(string key)
        {
            return await new Task<bool>(() => true);
        }

        /*
        private string GetDirPath()
        {
            var filesDirectoryPath = "assets\\img"; //FilesContext.FilesDirectoryPath;
            string webRootPath;

            this.InitData.TryGetValue("WebRootPath", out webRootPath);

            return System.IO.Path.Combine(webRootPath, filesDirectoryPath);
        }
        */
    }
}