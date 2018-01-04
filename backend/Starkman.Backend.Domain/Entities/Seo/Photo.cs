using System.Collections.Generic;
using Starkman.Backend.Domain.Entities.Seo;

namespace Starkman.Backend.Domain.Seo
{
    /// <inheritdoc />
    /// <summary>
    /// Фото
    /// </summary>
    public class Photo: SeoEntity
    {
        public byte[] Data { get; set; }
    }
}
