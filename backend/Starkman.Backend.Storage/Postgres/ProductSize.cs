using System;
using System.Collections.Generic;

namespace Storage.Postgres
{
    public partial class ProductSize
    {
        public ProductSize()
        {
            Price = new HashSet<Price>();
        }

        public string Size { get; set; }
        public short SortOrder { get; set; }

        public ICollection<Price> Price { get; set; }
    }
}
