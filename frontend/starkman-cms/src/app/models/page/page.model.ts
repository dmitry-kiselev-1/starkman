import {StorageEntity} from '../storage-entity.model';

export abstract class Page extends StorageEntity {
  public Url: string;
  public UrlParent: string;
  public Title: string;
  public Description: string;
  public MetaKeywords: string;
  public MetaDescription: string;
  public SortOrder: number;
}
