export class StorageEntity {
    public Key: string;
}

export class Page extends StorageEntity {
    public Url: string;
    public UrlParent: string;
    public Title: string;
    public Description: string;
    public MetaKeywords: string;
    public MetaDescription: string;
    public SortOrder: number;
}

export class Category extends Page {
    public Photo: Photo;
    public ProductList: Product[];
}

export class Photo extends Page {
    public Data: number[];
}

export class Product extends Page {
    public Sku: number;
    public PhotoList: Photo[];
}