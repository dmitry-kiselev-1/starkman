import {Page} from './page.model';
import {Photo} from './photo.model';
import {Product} from './product.model';

export class Category extends Page {
  public Photo: Photo;
  public ProductList: Product[];
}
