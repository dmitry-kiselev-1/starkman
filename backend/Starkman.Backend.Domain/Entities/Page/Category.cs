using System.Collections.Generic;

namespace Starkman.Backend.Domain.Entities.Page
{
    /// <inheritdoc />
    /// <summary>
    /// Товарная категория
    /// </summary>
    public class Category: Page
    {
        public Photo Photo { get; set; }
        public IList<Product> ProductList { get; set; }
    }
}
