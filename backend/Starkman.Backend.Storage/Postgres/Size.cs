using System;
using System.Collections.Generic;

namespace Storage.Postgres
{
    public partial class Size
    {
        public Size()
        {
            Price = new HashSet<Price>();
        }

        public string Size1 { get; set; }
        public short Sizeorder { get; set; }

        public ICollection<Price> Price { get; set; }
    }
}
