import {Page} from './page';
import {Photo} from './photo';

export interface Product extends Page {
  sku: number;
  photoList: Photo[];
}
