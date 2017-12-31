using System.Collections.Generic;
using System.Threading.Tasks;
using Starkman.Backend.Domain.Entities;
using Starkman.Backend.Domain.Entities.Seo;

namespace Starkman.Backend.Domain.Services
{
    /// <summary>
    /// Интерфейс сервиса хранения данных
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public interface IStorageService<T> where T : StorageEntity
    {
        Task<IEnumerable<T>> ListAsync();

        Task<T> FindAsync(string key);

        void AddAsync(T entity);

        void RemoveAsync(string key);
    }
}