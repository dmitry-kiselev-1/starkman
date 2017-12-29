using System;
using System.Collections.Generic;

namespace Storage.Postgres
{
    public partial class ProductPromotion
    {
        public long PromotionId { get; set; }
        public long ProductId { get; set; }

        public Product Product { get; set; }
        public Promotion Promotion { get; set; }
    }
}
