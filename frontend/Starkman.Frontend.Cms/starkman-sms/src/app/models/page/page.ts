import { Storageable } from './storageable';

export interface Page extends Storageable{
  url: string;
  urlParent?: string;
  title: string;
  description?: string;
  metaKeywords?: string;
  metaDescription?: string;
  sortOrder?: number;
  isVisible?: boolean;
}
