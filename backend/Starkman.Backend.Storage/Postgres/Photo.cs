using System;
using System.Collections.Generic;

namespace Storage.Postgres
{
    public partial class Photo
    {
        public Photo()
        {
            ProductPhoto = new HashSet<ProductPhoto>();
        }

        public long PhotoId { get; set; }
        public long SeoId { get; set; }

        public ICollection<ProductPhoto> ProductPhoto { get; set; }
    }
}
