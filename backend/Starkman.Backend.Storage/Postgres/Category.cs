using System;
using System.Collections.Generic;

namespace Storage.Postgres
{
    public partial class Category
    {
        public Category()
        {
            Product = new HashSet<Product>();
        }

        public long CategoryId { get; set; }
        public long? IconId { get; set; }
        public long? PhotoId { get; set; }
        public long SeoId { get; set; }

        public ICollection<Product> Product { get; set; }
    }
}
