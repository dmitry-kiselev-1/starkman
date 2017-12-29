using System;
using System.Collections.Generic;

namespace Storage.Postgres
{
    public partial class Price
    {
        public Price()
        {
            Orderdetail = new HashSet<Orderdetail>();
        }

        public long PriceId { get; set; }
        public long? ProductId { get; set; }
        public string Size { get; set; }
        public string Height { get; set; }
        public decimal Price1 { get; set; }
        public int? Count { get; set; }

        public ProductHeight HeightNavigation { get; set; }
        public Product Product { get; set; }
        public ProductSize SizeNavigation { get; set; }
        public ICollection<Orderdetail> Orderdetail { get; set; }
    }
}
