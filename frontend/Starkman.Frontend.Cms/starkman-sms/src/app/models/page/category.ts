import {Page} from './page';
import {Photo} from './photo';
import {Product} from './product';

export class Category extends Page {
  public Photo: Photo;
  public ProductList: Product[];
}
