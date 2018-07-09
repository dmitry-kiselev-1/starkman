import { Product } from '../page/product';
import { Storageable } from '../storageable';

export interface Offer extends Storageable {
    product: Product;
    count: number
    price: number;
    size: number;
    height: number;
}
