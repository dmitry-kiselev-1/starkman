import {Page} from './page';

export interface Photo extends Page {
  type?: string;
  size?: number;
  binaryString?: string;
  base64String?: string;
}
