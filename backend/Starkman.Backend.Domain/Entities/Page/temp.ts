export class StorageEntity {
    public key: string;
}

export class Page extends StorageEntity {
    public url: string;
    public urlParent: string;
    public title: string;
    public description: string;
    public metaKeywords: string;
    public metaDescription: string;
    public sortOrder: number;
}

export class Category extends Page {
    public photo: Photo;
    public productList: Product[];
}

export class Photo extends Page {
    public data: number[];
}

export class Product extends Page {
    public sku: number;
    public photoList: Photo[];
}


