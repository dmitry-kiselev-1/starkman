using System;
using System.Linq;
using System.Threading.Tasks;
using Storage.Postgres;
using Storage.Redis;

namespace Domain
{
    public class CategoryWriter
    {
        public async Task<bool> SetEntityToRedisAsync()
        {
            RedisContext c = new RedisContext();
            return await c.SetStringAsync("КЛЮЧ2", "ЗНАЧЕНИЕ2");
        }

        public async Task<bool> SetEntityToPostgresAsync()
        {
            using (PostgresContext db = new PostgresContext())
            {
                // создаем два объекта Category
                //Building building1 = new Building() { Address = "Адрес1", Id = db.Building.Count() + 1 };
                //Building building2 = new Building() { Address = "Адрес2", Id = db.Building.Count() + 2 };

                // добавляем их в бд
                //await db.Building.AddAsync(building1);
                //await db.Building.AddAsync(building2);

                return (await db.SaveChangesAsync() == 0);
            }
            /*
            return await Task.Run(() =>
            {
                using (PostgresContext db = new PostgresContext())
                {
                    return db.Apartment.ToList();
                }
            });
            */
        }


    }
}
