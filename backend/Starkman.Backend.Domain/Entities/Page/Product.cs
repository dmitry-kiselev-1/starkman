using System.Collections.Generic;

namespace Starkman.Backend.Domain.Entities.Page
{
    public class Product: Page
    {
        public int Sku { get; set; }
        public IList<Photo> PhotoList { get; set; }
    }
}
