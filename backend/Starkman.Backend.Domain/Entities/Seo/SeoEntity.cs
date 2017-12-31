namespace Starkman.Backend.Domain.Entities.Seo
{
    /// <inheritdoc />
    /// <summary> 
    /// Индексируемая html-страница в аспекте Seo
    /// </summary>
    public abstract class SeoEntity: StorageEntity
    {
        public string Url { get; set; }
        public string UrlParent { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string MetaKeywords { get; set; }
        public string MetaDescription { get; set; }
        public short? SortOrder { get; set; }
    }
}
