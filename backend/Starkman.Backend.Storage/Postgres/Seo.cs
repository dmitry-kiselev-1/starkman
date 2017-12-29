using System;
using System.Collections.Generic;

namespace Storage.Postgres
{
    public partial class Seo
    {
        public long SeoId { get; set; }
        public string Url { get; set; }
        public string UrlParent { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string MetaKeywords { get; set; }
        public string MetaDescription { get; set; }
        public short? SortOrder { get; set; }
    }
}
