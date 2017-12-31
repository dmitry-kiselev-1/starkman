using System.Collections.Generic;
using Starkman.Backend.Domain.Entities.Seo;

namespace Starkman.Backend.Domain.Seo
{
    public class Product: SeoEntity
    {
        public int Sku { get; set; }
        public IList<Photo> PhotoList { get; set; }
    }
}
