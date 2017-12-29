using System;
using System.Collections.Generic;

namespace Storage.Postgres
{
    public partial class Order
    {
        public Order()
        {
            Orderdetail = new HashSet<Orderdetail>();
        }

        public long OrderId { get; set; }
        public long ClientId { get; set; }
        public DateTime Orderdate { get; set; }
        public decimal Orderdateprice { get; set; }

        public Client Client { get; set; }
        public ICollection<Orderdetail> Orderdetail { get; set; }
    }
}
