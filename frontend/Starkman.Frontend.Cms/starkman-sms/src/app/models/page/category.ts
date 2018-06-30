import {Page} from './page';
import {Photo} from './photo';
import {Product} from './product';

export interface Category extends Page {
    photo: Photo;
    productList: Product[];
}
