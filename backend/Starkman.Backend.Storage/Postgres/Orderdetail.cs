using System;
using System.Collections.Generic;

namespace Storage.Postgres
{
    public partial class Orderdetail
    {
        public long OrderdetailId { get; set; }
        public long ClientorderId { get; set; }
        public long ProductId { get; set; }
        public long PriceId { get; set; }
        public decimal Orderdateprice { get; set; }

        public Clientorder Clientorder { get; set; }
        public Price Price { get; set; }
        public Product Product { get; set; }
    }
}
