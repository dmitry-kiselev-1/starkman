import {Page} from './page';
import {Photo} from './photo';

export class Product extends Page {
  public Sku: number;
  public PhotoList: Photo[];
}
