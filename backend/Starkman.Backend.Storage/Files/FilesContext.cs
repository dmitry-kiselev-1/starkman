using System.IO;
using Microsoft.Extensions.Configuration;

namespace Starkman.Backend.Storage.Files
{
    public static class FilesContext
    {
        public static string FilesDirectoryPath;

        static FilesContext()
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json");

            var configuration = builder.Build();

            string connectionString = configuration["ConnectionStrings:FilesStorageServiceConnectionString"];

            FilesContext.FilesDirectoryPath = connectionString;
        }
    }
}