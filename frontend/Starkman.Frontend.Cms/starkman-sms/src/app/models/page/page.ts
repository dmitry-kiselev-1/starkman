export interface Page {
  id?: string;
  url: string;
  urlParent?: string;
  title: string;
  description?: string;
  metaKeywords?: string;
  metaDescription?: string;
  sortOrder: number;
  isVisible: boolean;
}
