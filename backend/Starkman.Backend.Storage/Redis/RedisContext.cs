using System.Collections.Generic;
using System.Threading.Tasks;
using StackExchange.Redis;
using Storage.Postgres;

namespace Storage.Redis
{
    /// <summary>
    /// https://stackexchange.github.io/StackExchange.RedisConnection/Basics
    /// </summary>
    public class RedisContext
    {
        public static ConnectionMultiplexer RedisConnection = ConnectionMultiplexer.Connect("localhost:6379");

        //public IEnumerable<Building> GetUsers()
        //{
        //    IDatabase db = RedisConnection.GetDatabase(0);

        //    db.StringSet("КЛЮЧ", "ЗНАЧЕНИЕ");

        //    var result = db.StringGet("bryki").ToString();

        //    var result1 = db.HashGet("categories", "kostymi");

        //    /*
        //    string value = "abcdefg";
        //    db.StringSet("mykey", value);
        //    ...
        //    string value = db.StringGet("mykey");
        //    Console.WriteLine(value); // writes: "abcdefg"             
        //    */

        //    return new List<Building>();
        //}

        public async Task<bool> SetStringAsync(string key, string value)
        {
            IDatabase db = RedisConnection.GetDatabase(0);
            return await db.StringSetAsync(key, value, null, When.Always);
        }

        public async Task<string> GetStringAsync(string key)
        {
            IDatabase db = RedisConnection.GetDatabase(0);
            return await db.StringGetAsync(key);
        }

    }
}