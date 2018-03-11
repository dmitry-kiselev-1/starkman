using System;
using System.Collections.Generic;
using System.IO;
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
            if (String.IsNullOrWhiteSpace(key))
            {
                return new Photo();
            }
            else
            {
                var url = key.Split('.')[0];
                var type = key.Split('.')[1];

                var fullPath = System.IO.Path.Combine(this.GetDirPath(), key);

                if (!File.Exists(fullPath))
                {
                    return new Photo();
                }

                var bytes = await File.ReadAllBytesAsync(fullPath);   
                var base64String = Convert.ToBase64String(bytes);

                Photo photo = new Photo
                {
                    Base64String = $"data:image/{type};base64,{base64String}",
                    Url = url,
                    Type = type
                };

                return photo;
            }
        }

        public async Task<bool> SetAsync(Photo entity)
        {
            var fullPath = System.IO.Path.Combine(this.GetDirPath(), entity.Url + "." + entity.Type);

            if (String.IsNullOrWhiteSpace(fullPath))
            {
                return await new Task<bool>(() => false);
            }
            else
            {
                //var fileContent = Convert.FromBase64CharArray(entity.BinaryString.ToCharArray(), 0, entity.BinaryString.Length) ?? new Byte[0];
                var fileContent = Convert.FromBase64String(entity.Base64String.Split(',')[1]) ?? new Byte[0];

                await System.IO.File.WriteAllBytesAsync(fullPath, fileContent, CancellationToken.None);
                return true;
            }
        }

        public async Task<bool> RemoveAsync(string key)
        {
            var fullPath = System.IO.Path.Combine(this.GetDirPath(), key);

            return await Task.Run(() =>
            {
                if (!File.Exists(fullPath))
                {
                    return false;
                }
                else
                {
                    System.IO.File.Delete(fullPath);
                    return true;
                }
            });
        }
        
        private string GetDirPath()
        {
            return FilesContext.FilesDirectoryPath;
            //var filesDirectoryPath = FilesContext.FilesDirectoryPath;
            //this.InitData.TryGetValue("WebRootPath", out var webRootPath);
            //return System.IO.Path.Combine(webRootPath, @filesDirectoryPath);
        }
    }
}