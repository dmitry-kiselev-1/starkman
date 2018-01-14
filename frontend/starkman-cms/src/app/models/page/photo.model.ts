import {Page} from './page.model';

export class Photo extends Page {
  public Type: string;
  public Size: number;
  public BinaryString: string;
  public Base64String: string;
}
