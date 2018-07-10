import { Storageable } from '../storageable';

export interface Offer extends Storageable {
    count: number
    price: number;
    size: number;
    height: number;
}
