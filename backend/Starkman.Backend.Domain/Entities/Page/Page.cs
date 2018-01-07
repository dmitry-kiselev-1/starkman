namespace Starkman.Backend.Domain.Entities.Page
{
    /// <inheritdoc />
    /// <summary> 
    /// Индексируемая html-страница в аспекте Seo
    /// </summary>
    public abstract class Page: StorageEntity
    {
        public string Url { get; set; }
        public string UrlParent { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string MetaKeywords { get; set; }
        public string MetaDescription { get; set; }
        public short? SortOrder { get; set; }

        /// <summary>
        /// Признак отображения сущности
        /// </summary>
        public bool IsVisible { get; set; }
    }
}
