import { Storageable } from '../storageable';
import { Product } from '../page/product';

export interface Offer extends Storageable {
    count: number
    price: number;
    size: number;
    height: number;
    product: Product;
}
