using StackExchange.Redis;
using Microsoft.Extensions.Configuration;
using System;
using System.IO;

namespace Starkman.Backend.Storage.Redis
{
    /// <summary>
    /// https://stackexchange.github.io/StackExchange.RedisConnection/Basics
    /// </summary>
    public static class RedisContext
    {
        public static readonly ConnectionMultiplexer RedisConnection;

        static RedisContext()
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json");

            var configuration = builder.Build();

            string connectionString = configuration["ConnectionStrings:RedisStorageServiceConnectionString"];

            RedisConnection = ConnectionMultiplexer.Connect(connectionString);
        }
    }
}