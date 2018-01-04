using System.Collections.Generic;
using System.Threading.Tasks;
using Starkman.Backend.Domain.Entities;

namespace Starkman.Backend.Domain.Services
{
    /// <summary>
    /// Интерфейс сервиса хранения данных
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public interface IStorageService<T> where T : StorageEntity
    {
        /// <summary>
        /// Возвращает полную коллекцию сущностей T
        /// </summary>
        Task<IEnumerable<T>> ListAsync();

        /// <summary>
        /// Возвращает сущность T по ключу
        /// </summary>
        Task<T> FindAsync(string key);

        /// <summary>
        /// Перезаписывает (добавляет при отсутствии) сущность T
        /// </summary>
        Task<bool> SetAsync(T entity);

        /// <summary>
        /// Удаляет сущность T
        /// </summary>
        Task<bool> RemoveAsync(string key);
    }
}