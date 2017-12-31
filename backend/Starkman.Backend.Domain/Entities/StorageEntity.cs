namespace Starkman.Backend.Domain.Entities
{
    /// <summary> 
    /// Элемент коллекции сущностей в хранилище
    /// </summary>
    public abstract class StorageEntity
    {
        /// <summary>
        /// Уникальный идентификатор сущности в коллекции
        /// </summary>
        public string Key { get; set; }
    }
}
