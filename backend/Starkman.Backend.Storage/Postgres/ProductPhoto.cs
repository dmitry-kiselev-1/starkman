using System;
using System.Collections.Generic;

namespace Storage.Postgres
{
    public partial class ProductPhoto
    {
        public long ProductId { get; set; }
        public long PhotoId { get; set; }

        public Photo Photo { get; set; }
        public Product Product { get; set; }
    }
}
