import { Page } from './page';
import { Photo } from './photo';
import { Offer } from '../order/offer';
import { Filter } from '../order/filter';

export interface Product extends Page {
    sku?: number;
    price?: number;
    photoList?: Photo[];
    offerList?: Offer[];
    filterList?: Filter[];
}
