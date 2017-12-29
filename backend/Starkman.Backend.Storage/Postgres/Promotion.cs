using System;
using System.Collections.Generic;

namespace Storage.Postgres
{
    public partial class Promotion
    {
        public Promotion()
        {
            ProductPromotion = new HashSet<ProductPromotion>();
        }

        public long PromotionId { get; set; }
        public long SeoId { get; set; }

        public ICollection<ProductPromotion> ProductPromotion { get; set; }
    }
}
