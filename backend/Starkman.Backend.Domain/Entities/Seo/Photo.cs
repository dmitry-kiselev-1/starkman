using System.Collections.Generic;
using Starkman.Backend.Domain.Entities.Seo;
using Storage.Postgres;

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
