import {Injectable} from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {BaseService} from './base-service';
import {Category} from '../models/page/category.model';

@Injectable()
export class CategoryService extends BaseService {

  constructor(private http: Http) {
    super();
    this.apiRoutePrefix = '/api/category/';
  }

  public getList(): Promise<Category[]> {
    return this.http.get(
      this.apiDomain + this.apiRoutePrefix,
      this.requestOptions)
      .toPromise()
      .then(response => {
          return response.json() as Category[];
        }
      )
      .catch(this.handleError);
  }

  public get(id: string): Promise<Category> {
    return this.http.get(
      this.apiDomain + this.apiRoutePrefix + id,
      this.requestOptions)
      .toPromise()
      .then(response => {
          return response.json() as Category;
        }
      )
      .catch(this.handleError);
  }

  public delete(id: string): Promise<boolean> {
    return this.http.delete(
      this.apiDomain + this.apiRoutePrefix + id,
      this.requestOptions)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  public post(period: Category): Promise<boolean> {
    return this.http.post(
      this.apiDomain + this.apiRoutePrefix,
      period,
      this.requestOptions)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }
}
