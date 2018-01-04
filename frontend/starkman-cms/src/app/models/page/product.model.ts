import {Page} from './page.model';
import {Photo} from './photo.model';

export class Product extends Page {
  public Sku: number;
  public PhotoList: Photo[];
}
