namespace Starkman.Backend.Domain.Entities.Page
{
    /// <inheritdoc />
    /// <summary>
    /// Фото
    /// </summary>
    public class Photo: Page
    {
        public string SourceName;
        public string Type;
        public int Size;
        public string BinaryString { get; set; }
        public string Base64String { get; set; }
    }
}
