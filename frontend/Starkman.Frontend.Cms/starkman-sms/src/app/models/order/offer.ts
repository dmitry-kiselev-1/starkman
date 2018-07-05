import { Product } from '../page/product';

export interface Offer {
    product: Product;
    count: number
    price: number;
    size: number;
    height: number;
}
