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

        /// <summary>
        /// Признак отображения сущности
        /// </summary>
        public bool IsVisible { get; set; }

        /// <summary>
        /// Признак удаления сущности
        /// </summary>
        public bool IsDeleted { get; set; }

    }
}
