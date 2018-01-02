using StackExchange.Redis;

namespace Starkman.Backend.Storage.Redis
{
    /// <summary>
    /// https://stackexchange.github.io/StackExchange.RedisConnection/Basics
    /// </summary>
    public class RedisContext
    {
        public static ConnectionMultiplexer RedisConnection = ConnectionMultiplexer.Connect("localhost:6379");
    }
}