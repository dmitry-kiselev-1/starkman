import { Page } from './page';
import { Photo } from './photo';
import { Offer } from '../order/offer';
import { Filter } from './filter';
import { OfferGrid } from '../order/offer-grid';

export interface Product extends Page {
    sku?: string;
    price?: number;
    offerList?: Offer[];
    filterList?: Filter[];
    offerGrid?: OfferGrid;
}
