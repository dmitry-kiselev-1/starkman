using System;
using System.Collections.Generic;

namespace Storage.Postgres
{
    public partial class Product
    {
        public Product()
        {
            Orderdetail = new HashSet<Orderdetail>();
            Price = new HashSet<Price>();
            ProductPhoto = new HashSet<ProductPhoto>();
            ProductPromotion = new HashSet<ProductPromotion>();
        }

        public long ProductId { get; set; }
        public long CategoryId { get; set; }
        public long SeoId { get; set; }
        public long Sku { get; set; }

        public Category Category { get; set; }
        public ICollection<Orderdetail> Orderdetail { get; set; }
        public ICollection<Price> Price { get; set; }
        public ICollection<ProductPhoto> ProductPhoto { get; set; }
        public ICollection<ProductPromotion> ProductPromotion { get; set; }
    }
}
