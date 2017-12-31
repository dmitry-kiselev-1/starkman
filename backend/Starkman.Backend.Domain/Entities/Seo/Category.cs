using System.Collections.Generic;
using Photo = Starkman.Backend.Domain.Seo.Photo;
using Product = Starkman.Backend.Domain.Seo.Product;

namespace Starkman.Backend.Domain.Entities.Seo
{
    /// <inheritdoc />
    /// <summary>
    /// Товарная категория
    /// </summary>
    public class Category: SeoEntity
    {
        public Photo Photo { get; set; }
        public IList<Product> ProductList { get; set; }
    }
}
