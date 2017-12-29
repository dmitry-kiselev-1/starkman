using System;
using System.Collections.Generic;

namespace Storage.Postgres
{
    public partial class Height
    {
        public Height()
        {
            Price = new HashSet<Price>();
        }

        public string Height1 { get; set; }
        public short Heightorder { get; set; }

        public ICollection<Price> Price { get; set; }
    }
}
