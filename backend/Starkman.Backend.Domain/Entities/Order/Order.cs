using System;
using System.Collections.Generic;

namespace Starkman.Backend.Domain.Entities.Page
{
    public class Order: Page
    {
        public string Number { get; set; }
        public DateTime Date { get; set; }
        public IList<Product> ProductList { get; set; }
    }
}
