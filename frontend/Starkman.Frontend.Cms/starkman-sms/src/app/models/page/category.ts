import {Page} from './page';
import {Photo} from './photo';
import {Product} from './product';
import { OfferGrid } from '../order/offer-grid';

export interface Category extends Page {
    productList?: Product[];
    offerGrid?: OfferGrid;
}
