export abstract class Page {
  public Url: string;
  public UrlParent: string;
  public Title: string;
  public Description: string;
  public MetaKeywords: string;
  public MetaDescription: string;
  public SortOrder: number;
  public IsVisible: boolean = true;
}
