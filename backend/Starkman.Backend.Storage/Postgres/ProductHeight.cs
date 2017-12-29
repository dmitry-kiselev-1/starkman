using System;
using System.Collections.Generic;

namespace Storage.Postgres
{
    public partial class ProductHeight
    {
        public ProductHeight()
        {
            Price = new HashSet<Price>();
        }

        public string Height { get; set; }
        public short SortOrder { get; set; }

        public ICollection<Price> Price { get; set; }
    }
}
